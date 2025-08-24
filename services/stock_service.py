import yfinance as yf
import asyncio


async def get_stock_ticker(symbol: str):
    loop = asyncio.get_event_loop()
    ticker = await loop.run_in_executor(None, yf.Ticker, symbol)
    return ticker

async def get_stock_price(ticker) -> float:
    loop = asyncio.get_event_loop()
    history = await loop.run_in_executor(None, ticker.history, "1d")
    return history["Close"].iloc[-1]

async def get_stock_info(ticker):
    loop = asyncio.get_event_loop()
    info = await loop.run_in_executor(None, lambda: ticker.info)
    return info

async def calculate_revenue_growth(ticker):
    loop = asyncio.get_event_loop()
    financials = await loop.run_in_executor(None, lambda: ticker.financials)
    revenues = financials.loc['Total Revenue']
    last_year = revenues.iloc[0]
    prev_year = revenues.iloc[1]
    return (last_year - prev_year) / prev_year

async def calculate_assets_to_liabilities(ticker):
    loop = asyncio.get_event_loop()
    balance_sheet = await loop.run_in_executor(None, lambda: ticker.balance_sheet)
    total_assets = balance_sheet.loc['Total Assets'].iloc[0] if 'Total Assets' in balance_sheet.index else 0
    total_liabilities = balance_sheet.loc['Total Liab'].iloc[0] if 'Total Liab' in balance_sheet.index else 1
    return total_assets / total_liabilities if total_liabilities else 0

async def calculate_net_profit_margin(ticker):
    loop = asyncio.get_event_loop()
    financials = await loop.run_in_executor(None, lambda: ticker.financials)
    total_revenue = financials.loc['Total Revenue'].iloc[0]
    net_income = financials.loc['Net Income'].iloc[0]
    return net_income / total_revenue


async def grade_stock(symbol: str):
    ticker = await get_stock_ticker(symbol)
    price = await get_stock_price(ticker)
    info = await get_stock_info(ticker)
    forwardPE = info.get("forwardPE")
    cash = info.get("totalCash") or 0
    debt = info.get("totalDebt") or 1
    cashDebtRatio = cash / debt
    revenue_growth = await calculate_revenue_growth(ticker)
    assets_to_liabilities = await calculate_assets_to_liabilities(ticker)
    net_profit_margin = await calculate_net_profit_margin(ticker)
    return {
            "Symbol": symbol.upper(),
            "Price": price,
            "Forward PE": forwardPE,
            "Cash-Debt Ratio": cashDebtRatio,
            "Revenue Growth": revenue_growth,
            "Assets to Liabilities": assets_to_liabilities,
            "Net Profit Margin": net_profit_margin,
        }
