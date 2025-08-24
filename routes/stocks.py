from fastapi import APIRouter, HTTPException
from services.stock_service import grade_stock

router = APIRouter()

@router.get("/grade/{symbol}")
async def grade_stock_endpoint(symbol: str):
    try:
        metrics = await grade_stock(symbol)
        return metrics
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error occurred while collecting metrics: {e}")

