from typing import List, Optional, Tuple, Union
from pathlib import Path
import numpy as np
from cli.layout import Layout
from cli.serialization import PickleSerializer
from cli.schemas.layout import Position, Bounds

# https://github.com/khuyentran1401/kdtree-implementation/blob/master/kdtree.py


class KDTreeNode:
    # TODO: add parent as field?
    def __init__(self, segment_id: str, bounds: Bounds, position: Position, split_x=True):
        self.segment_id = segment_id
        self.bounds = bounds
        self.position = position
        self.xmax = np.inf
        self.ymax = np.inf
        self.xmin = -np.inf
        self.ymin = -np.inf
        self.split_x = split_x
        self.left: Optional[KDTreeNode] = None
        self.right: Optional[KDTreeNode] = None

    def set_min_max(self, parent: "KDTreeNode", split_x: bool) -> None:
        self.xmin = parent.xmin
        self.xmax = parent.xmax
        self.ymin = parent.ymin
        self.ymax = parent.ymax

        if split_x:
            if self.position.y <= parent.position.y:
                self.ymax = parent.position.y
            else:
                self.ymin = parent.position.y
        else:
            if self.position.x <= parent.position.x:
                self.xmax = parent.position.x
            else:
                self.xmin = parent.position.x

    def is_leaf(self) -> bool:
        return self.left is None and self.right is None

    def __str__(self) -> str:
        # return "[(" + str(self.position.x) + ", " + str(self.position.y) + ")]"
        return f"[{self.segment_id} pos: (x: {self.position.x}, y: {self.position.y}) bounds: (xl: {self.bounds.xl}, xr: {self.bounds.xr})]"

    def __repr__(self) -> str:
        return "<KDTreeNode " + self.__str__() + ">"


class KDTree:
    def __init__(self, data: np.ndarray) -> None:
        assert data.shape[1] == 4

        segment_ids = data[:, 0]
        bounds = data[:, 1]
        xs = data[:, 2]
        ys = data[:, 3]

        sorted_x_indices = np.argsort(xs)
        sorted_y_indices = np.argsort(ys)
        self.root = self._construct_tree(xs, ys, segment_ids, bounds, sorted_x_indices, sorted_y_indices, True)

    def _select(self, truncated_sorted_first_indices, sorted_second_indices) -> np.ndarray:
        """
        When choosing a side from the median (left or right) for one coordinate, we get a truncated list of indices.
        This method selects all the indices from the other coordinate that corresponds with
        the selected indices from the first coorinate.
        """
        matching_indices = np.array([]).astype(int)
        for i in sorted_second_indices:
            matches = truncated_sorted_first_indices == i
            if matches.any() == True:
                matching_indices = np.append(matching_indices, i)
        return matching_indices

    def _construct_tree(
        self,
        xs: np.ndarray,
        ys: np.ndarray,
        segments: np.ndarray,
        bounds: np.ndarray,
        ix: np.ndarray,
        iy: np.ndarray,
        split_x: bool,
        parent: KDTreeNode = None,
    ) -> KDTreeNode:
        n = ix.shape[0]
        median = n // 2

        # split on x-coordinate
        if split_x:
            node = KDTreeNode(
                segments[ix[median]], bounds[ix[median]], Position(x=xs[ix[median]], y=ys[ix[median]]), True
            )

            if parent is not None:
                # set min and max fields
                node.set_min_max(parent, split_x)

            if median > 0:
                # select corresponding indices
                sub_iy = self._select(ix[:median], iy)
                # recursively construct on left
                node.left = self._construct_tree(xs, ys, segments, bounds, ix[:median], sub_iy, False, node)
            if median + 1 < n:
                # select corresponding indices
                sub_iy = self._select(ix[median + 1 :], iy)
                # recursively construct on right
                node.right = self._construct_tree(xs, ys, segments, bounds, ix[median + 1 :], sub_iy, False, node)

        # split on y-coordinate
        else:
            node = KDTreeNode(
                segments[iy[median]], bounds[iy[median]], Position(x=xs[iy[median]], y=ys[iy[median]]), False
            )

            if parent is not None:
                # set min and max fields
                node.set_min_max(parent, split_x)

            if median > 0:
                # select corresponding indices
                sub_ix = self._select(iy[:median], ix)
                # recursively construct on left
                node.left = self._construct_tree(xs, ys, segments, bounds, sub_ix, iy[:median], True, node)
            if median + 1 < n:
                # select corresponding indices
                sub_ix = self._select(iy[median + 1 :], ix)
                # recursively construct on right
                node.right = self._construct_tree(xs, ys, segments, bounds, sub_ix, iy[median + 1 :], True, node)

        return node

    def is_fully_contained(self, node: KDTreeNode, lu: Position, rd: Position) -> bool:
        if node:
            xmin, xmax, ymin, ymax = self._expand_bounds(lu, rd)
            if xmin <= node.xmin and xmax >= node.xmax and ymin <= node.ymin and ymax >= node.ymax:
                return True
        return False

    def is_intersect(self, node: KDTreeNode, lu: Position, rd: Position) -> bool:
        if node:
            xmin, xmax, ymin, ymax = self._expand_bounds(lu, rd)
            if ymin > node.ymax or ymax < node.ymin or xmin > node.xmax or xmax < node.xmin:
                return False
        return True

    def print(self) -> None:
        # TODO: better visualization
        traversal = self.in_order_traversal()
        for node in set(traversal):
            print(node)

    def in_order_traversal(self) -> List[KDTreeNode]:
        result: List[KDTreeNode] = []
        self._in_order_traversal(self.root, result)
        return result

    def _in_order_traversal(self, curr: KDTreeNode, traversal: List[KDTreeNode]) -> None:
        if curr.left is not None:
            traversal.append(curr.left)
            self._in_order_traversal(curr.left, traversal)
        traversal.append(curr)
        if curr.right is not None:
            traversal.append(curr.right)
            self._in_order_traversal(curr.right, traversal)

    def range_query(self, lu: Position, rd: Position) -> List[KDTreeNode]:
        return self._range_query(self.root, lu, rd)

    def _range_query(self, node: KDTreeNode, lu: Position, rd: Position) -> List[KDTreeNode]:
        result: List[KDTreeNode] = []

        if node is None:
            return result

        xmin, xmax, ymin, ymax = self._expand_bounds(lu, rd)

        if node.is_leaf():
            if (
                xmin <= node.position.x
                and xmax >= node.position.x
                and ymin <= node.position.y
                and ymax >= node.position.y
            ):
                result.append(node)
        else:
            if (
                xmin <= node.position.x
                and xmax >= node.position.x
                and ymin <= node.position.y
                and ymax >= node.position.y
            ):
                result.append(node)

            if node.left:
                result += self._retrieve_nodes(node.left, lu, rd)
            if node.right:
                result += self._retrieve_nodes(node.right, lu, rd)

        return result

    def _retrieve_nodes(self, node: KDTreeNode, lu: Position, rd: Position) -> List[KDTreeNode]:
        result = []

        if self.is_fully_contained(node, lu, rd):
            result += self.get_all_nodes_in_subtree(node)
        elif self.is_intersect(node, lu, rd):
            result += self._range_query(node, lu, rd)

        return result

    def get_all_nodes_in_subtree(self, node: Optional[KDTreeNode]) -> List[KDTreeNode]:
        members: List[KDTreeNode] = []

        if node:
            members += self.get_all_nodes_in_subtree(node.left)
            members.append(node)
            members += self.get_all_nodes_in_subtree(node.right)

        return members

    def _expand_bounds(self, lu: Position, rd: Position) -> Tuple[float, float, float, float]:
        return lu.x, rd.x, rd.y, lu.y

    @classmethod
    def create_tree_from_layout(cls, layout: Layout) -> "KDTree":
        # TODO: need bound information in tree?
        # TODO: is y needed?
        X = np.zeros((len(layout.nodes), 4), dtype=object)
        for i, (segment, (position, bounds)) in enumerate(layout.nodes.items()):
            X[i] = (segment, bounds, position.x, position.y)
        return cls(X)

    @classmethod
    def serialize(cls, tree: "KDTree", to_file: Path = None) -> Union[Path, bytes]:
        return PickleSerializer.serialize(tree, to_file)

    @classmethod
    def deserialize(cls, b: bytes = None, from_file: Path = None) -> "KDTree":
        return PickleSerializer.deserialize(b, from_file)
