from fastapi import APIRouter, HTTPException
from services.stock_service import get_stock_price, get_stock_pe

router = APIRouter()

@router.get("/price/{symbol}")
async def fetch_stock_price(symbol: str):
    try:
        price = await get_stock_price(symbol)
        return {"symbol": symbol.upper(), "price": price}
    except Exception:
        raise HTTPException(status_code=404, detail="Stock symbol not found")

@router.get("/forward_pe/{symbol}")
async def fetch_stock_pe(symbol: str):
    try:
        pe = await get_stock_pe(symbol)
        return {"symbol": symbol.upper(), "forward_pe": pe}
    except Exception:
        raise HTTPException(status_code=404, detail="Stock symbol not found")