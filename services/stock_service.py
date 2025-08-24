import yfinance as yf
import asyncio

async def get_stock_price(symbol: str) -> float:
    loop = asyncio.get_event_loop()
    stock = await loop.run_in_executor(None, yf.Ticker, symbol)
    history = await loop.run_in_executor(None, stock.history, "1d")
    return history["Close"].iloc[-1]

async def get_stock_pe(symbol: str):
    loop = asyncio.get_event_loop()
    stock = await loop.run_in_executor(None, yf.Ticker, symbol)
    info = await loop.run_in_executor(None, lambda: stock.info)
    return info.get("forwardPE")