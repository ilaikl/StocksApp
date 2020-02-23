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
        return this.users
    }
    get currentUser() {
        return this.currentUser
    }
    get stocks() {
        return this.stocks
    }
    get currentStock() {
        return this.currentStock
    }
    get recommendations() {
        return this.recommendations
    }
    get currentRecommendation() {
        return this.currentRecommendation
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
            .then(dataUnparsed => {
                let data = JSON.parse(dataUnparsed)
                this._currentUser = {
                    userId: data.userId,
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
            .then(dataUnparsed => {
                let data = JSON.parse(dataUnparsed)
                this._currentStock = {
                    stockId: data.stockId,
                    stockVal: data.stockVal
                    //add stock values
                }
            })
    }
    
    
    async getStocks() {
        await $.get(`/stocks`)
            .then(async response => {
                this._stocks = [...response]
            })
    }


    async getRecommendation(recommendationId) {
        await $.get(`/recommendation/${recommendationId}`)
            .then(dataUnparsed => {
                let data = JSON.parse(dataUnparsed)
                this._currentRecommendation = {
                    
                    recommendationId:data.recommendationId,
                    stockName: data.stockName,
                    currentDate: data.currentDate,
                    forcastDate: data.forcastDate,
                    currentValuw:data.currentValuw,
                    forcastValue:data.forcastValue,
                    user: data.user.userId  
                }
            })
    }


    async saveRecommendation() {
        await $.post('/city', this._currentCity)
    }

}