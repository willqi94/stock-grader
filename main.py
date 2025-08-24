from fastapi import FastAPI
from routes import stocks

app = FastAPI(
    title="Stock Info API",
    description="API to fetch stock data",
    version="1.0.0"
)

# Include stock routes
app.include_router(stocks.router, prefix="/api/stocks", tags=["Stocks"])