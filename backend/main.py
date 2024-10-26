from flask import Flask, jsonify
from flask_cors import CORS
import requests
import yfinance as yf

#apikey="UenqFSU8YlzKlGyZ1cvZjbV3Aje2Jujv"
app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route("/") #main page
def default():
    return "Welcome to the yfinance JSON API"

@app.route("/popular/stocks") #route to get the list of top 5 popular stocks
def popular_stocks():
    TRENDING_TICKERS = ['AAPL', 'MSFT', 'TSLA', 'GOOGL', 'AMZN']
    trending_data = []

    try:
        for tickers in TRENDING_TICKERS:
            stock = yf.Ticker(tickers)
            stock_info = stock.history(period="1d").iloc[-1]

            # Calculate percentage change
            percentage_change = ((stock_info['Close'] - stock_info['Open']) / stock_info['Open']) * 100


            trending_data.append({
                'symbol': tickers,
                'open': float(stock_info['Open']),
                'close': float(stock_info['Close']),
                'high': float(stock_info['High']),
                'low': float(stock_info['Low']),
                'volume': int(stock_info['Volume']),
                'percentage_change': round(percentage_change, 2)
            })
        
        return jsonify(trending_data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/stock/<ticker>", methods=['GET']) #route to get the info related to a particular ticker
def get_stock_data(ticker):
    try:
        #fetching data from yfinance
        stock = yf.Ticker(ticker)
        stock_info = stock.history(period="1d")

        if stock_info.empty:
            return jsonify({"error": "Invalid Ticker Symbol"}), 404
        
        # Return relevant stock data as JSON
        data = {
            'symbol': ticker.upper(),
            'open': float(stock_info['Open'].values[0]),
            'close': float(stock_info['Close'].values[0]),
            'high': float(stock_info['High'].values[0]),
            'low': float(stock_info['Low'].values[0]),
            'volume': int(stock_info['Volume'].values[0])
        }
        return jsonify(data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#route to get indo related multiple stocks
@app.route("/stocks/list") 
def stocks_lists():
    KEY = "cs90j1pr01qu0vk4jg60cs90j1pr01qu0vk4jg6g";
    try:
        symbols = ['MSFT', 'TSLA', 'GOOGL', 'AMZN', 'NVDA', "AAPL", "META", "NFLX", "CSCO", "BAC", "V", "PFE", "INTC","PYPL", "KO" ]
        stock_data = []

        for symbol in symbols:
            stock = yf.Ticker(symbol)

             # Fetch company profile from Finnhub to get the logo
            profile_resp = requests.get(f'https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={KEY}')
            profile_data = profile_resp.json()
            logo_url = profile_data.get('logo', 'N/A')  # Logo URL

            #fetching current stocks data
            info = stock.info
            market_data = stock.history(period="1d").iloc[-1]

            #append relevent data to the list
            stock_data.append({
                'ticker': symbol,
                'conpany_name': info.get('shortName', 'N/A'),
                'current_price': market_data['Close'],
                'change_percentage': ((market_data['Close'] - market_data['Open']) / market_data['Open']) * 100,
                'market_cap': info.get('marketCap', 'N/A'),    # Market cap
                'pe_ratio': info.get('trailingPE', 'N/A'),     # P/E ratio
                'logo_url': logo_url 
            })
        
        return jsonify(stock_data)
    
    except Exception as e:
        print(f"Error fetching the stock data: {e}")
        return jsonify({"error": "Could not retrieve stock data"}), 500
        

if __name__ == "__main__":
    app.run(port=5555, host="0.0.0.0", debug=True)

