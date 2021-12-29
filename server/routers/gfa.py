from fastapi import APIRouter, status
import logic.gfa as GfaLogic


router = APIRouter(prefix="/gfa", tags=["gfa"])


