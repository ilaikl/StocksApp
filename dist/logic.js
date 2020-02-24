class Logic {
    constructor() {
        this._stocks = []
        this._currentStock = {}
        this._users = []
        this._currentUser = {}
        this._recommendations = []
        this._currentRecommendation = {}
    }

    get users() {
        return this._users
    }
    get currentUser() {
        return this._currentUser
    }
    get stocks() {
        return this._stocks
    }
    get currentStock() {
        return this._currentStock
    }
    get recommendations() {
        return this._recommendations
    }
    get currentRecommendation() {
        return this._currentRecommendation
    }

    set currentUser(id) {
        this._currentUser = this._users.find(e => e.userId == id)
    }
    set currentRecommendation(id) {
        this._currentRecommendation = this._recommendations.find(e => e.recommendationId == id)
    }
    set currentStock(id) {
        this._currentStock = this._stocks.find(e => e.stockId == id)
    }

    async getUser(uid) {
        await $.get(`/user/${uid}`)
            .then(data => {
                this._currentUser = {
                    userId: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    img: data.img,
                    recommendedStocks: [],
                    rank: data.rank
                }
            })
    }

    async getUsers() {
        await $.get(`/users`)
            .then(async response => {
                this._users = [...response]
            })
    }

    async getStock(stockId) {
        await $.get(`/stock/${stockId}`)
            .then(res => {
               
                this._currentStock = {
                   ... res.data[0]
                }
            })
    }
    
    
    async getStocks() {
        await $.get(`/stocks`)
            .then(async response => {
                this._stocks = response
                // this._stocks = JSON.parse(response)
                
                
            })
    }


    async getRecommendationsByStockSymbol(stockSymbol) {
        await $.get(`/recommendationsSS/${stockSymbol}`)
            .then(response => {
                this._recommendations = response              
            
            })
    }
    
    async getRecommendationsByUserId(uid) {        
        await $.get(`/recommendationsUid/${uid}`)
            .then(response => {
                this._recommendations = response
            })
    }

    async getRecommendation(recommendationId) {
        await $.get(`/recommendation/${recommendationId}`)
            .then(data => {
                this._currentRecommendation = {
                    
                    recommendationId:data._id,
                    stockSymbol: data.stockSymbol,
                    currentDate: data.currentDate,
                    forcastDate: data.forcastDate,
                    currentValuw:data.currentValuw,
                    forcastValue:data.forcastValue,
                    user: data.user  
                }
            })
    }


    async saveRecommendation() {
        await $.post('/city', this._currentCity)
    }

}