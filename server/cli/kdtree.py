from typing import List, Tuple, Union
import numpy as np

from layout import Layout
from serialization import PickleSerializer
from schemas.layout import Position

# https://github.com/khuyentran1401/kdtree-implementation/blob/master/kdtree.py


class KDTreeNode:
    # TODO: add parent as field?
    def __init__(self, x, y, split_x=True):
        self.x = x
        self.y = y
        self.xmax = np.inf
        self.ymax = np.inf
        self.xmin = -np.inf
        self.ymin = -np.inf
        self.split_x = split_x
        self.left = None
        self.right = None

    def set_min_max(self, parent: "KDTreeNode", split_x: bool) -> None:
        self.xmin = parent.xmin
        self.xmax = parent.xmax
        self.ymin = parent.ymin
        self.ymax = parent.ymax

        if split_x:
            if self.y <= parent.y:
                self.ymax = parent.y
            else:
                self.ymin = parent.y
        else:
            if self.x <= parent.x:
                self.xmax = parent.x
            else:
                self.xmin = parent.x

    def is_leaf(self) -> bool:
        return self.left == None and self.right == None

    def __str__(self) -> str:
        return "(" + str(self.x) + ", " + str(self.y) + ")"

    def __repr__(self) -> str:
        return "<KDTreeNode " + self.__str__() + ">"


class KDTree:
    def __init__(self, data: np.ndarray) -> None:
        assert data.shape[1] == 2

        xs = data[:, 0]
        ys = data[:, 1]
        sorted_x_indices = np.argsort(xs)
        sorted_y_indices = np.argsort(ys)
        self.root = self._construct_tree(xs, ys, sorted_x_indices, sorted_y_indices, True)

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
        self, xs: np.ndarray, ys: np.ndarray, ix: np.ndarray, iy: np.ndarray, split_x: bool, parent: KDTreeNode = None,
    ) -> KDTreeNode:
        n = ix.shape[0]
        median = n // 2

        # split on x-coordinate
        if split_x:
            node = KDTreeNode(xs[ix[median]], ys[ix[median]], True)

            if parent is not None:
                # set min and max fields
                node.set_min_max(parent, split_x)

            if median > 0:
                # select corresponding indices
                sub_iy = self._select(ix[:median], iy)
                # recursively construct on left
                node.left = self._construct_tree(xs, ys, ix[:median], sub_iy, False, node)
            if median + 1 < n:
                # select corresponding indices
                sub_iy = self._select(ix[median + 1 :], iy)
                # recursively construct on right
                node.right = self._construct_tree(xs, ys, ix[median + 1 :], sub_iy, False, node)

        # split on y-coordinate
        else:
            node = KDTreeNode(xs[iy[median]], ys[iy[median]], False)

            if parent is not None:
                # set min and max fields
                node.set_min_max(parent, split_x)

            if median > 0:
                # select corresponding indices
                sub_ix = self._select(iy[:median], ix)
                # recursively construct on left
                node.left = self._construct_tree(xs, ys, sub_ix, iy[:median], True, node)
            if median + 1 < n:
                # select corresponding indices
                sub_ix = self._select(iy[median + 1 :], ix)
                # recursively construct on right
                node.right = self._construct_tree(xs, ys, sub_ix, iy[median + 1 :], True, node)

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
        self._print_tree(self.root)

    def _print_tree(self, node: KDTreeNode) -> None:
        if node.left is not None:
            self._print_tree(node.left)
        print(node)
        if node.right is not None:
            self._print_tree(node.right)

    def range_query(self, lu: Position, rd: Position) -> List[KDTreeNode]:
        return self._range_query(self.root, lu, rd)

    def _range_query(self, node: KDTreeNode, lu: Position, rd: Position) -> List[KDTreeNode]:
        result: List[KDTreeNode] = []

        if node == None:
            return result

        xmin, xmax, ymin, ymax = self._expand_bounds(lu, rd)

        if node.is_leaf():
            if xmin <= node.x and xmax >= node.x and ymin <= node.y and ymax >= node.y:
                result.append(node)
        else:
            if xmin <= node.x and xmax >= node.x and ymin <= node.y and ymax >= node.y:
                result.append(node)

            result += self._retrieve_nodes(node.left, lu, rd)
            result += self._retrieve_nodes(node.right, lu, rd)

        return result

    def _retrieve_nodes(self, node: KDTreeNode, lu: Position, rd: Position) -> List[KDTreeNode]:
        result = []

        if self.is_fully_contained(node, lu, rd):
            result += self.get_all_nodes_in_subtree(node)
        elif self.is_intersect(node, lu, rd):
            result += self._range_query(node, lu, rd)

        return result

    def get_all_nodes_in_subtree(self, node: KDTreeNode) -> List[KDTreeNode]:
        members = []

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
        X = np.zeros((len(layout.nodes), 2))
        for i, (position, _) in enumerate(layout.nodes.values()):
            X[i] = (position.x, position.y)
        return cls(X)

    @classmethod
    def serialize(cls, tree: "KDTree", to_file: str = None) -> Union[bytes, str]:
        return PickleSerializer.serialize(tree, to_file)

    @classmethod
    def deserialize(cls, b: bytes = None, from_file: str = None) -> "KDTree":
        return PickleSerializer.deserialize(b, from_file)

