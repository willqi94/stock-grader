from fastapi import APIRouter, HTTPException
from services.stock_service import get_stock_price

router = APIRouter()

@router.get("/{symbol}")
async def fetch_stock(symbol: str):
    try:
        price = await get_stock_price(symbol)
        return {"symbol": symbol.upper(), "price": price}
    except Exception:
        raise HTTPException(status_code=404, detail="Stock symbol not found")
