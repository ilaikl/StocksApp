
class Logic {
    constructor() {
        this._stocks = []
        this._currentStock = {}
        this._users = []
        this._currentUser = {}
        this._loggedInUser = {}
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

    set loggedInUser(id) {
        this._currentUser = this._users.find(e => e.userId == id)
    }
    set currentRecommendation(id) {
        this._currentRecommendation = this._recommendations.find(e => e.recommendationId == id)
    }
    set currentStock(id) {
        this._currentStock = this._stocks.find(e => e.stockId == id)
    }

    async getUserData(uid) {

        const data = await $.get(`/user/${uid}`)

        let user = {
            userId: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            img: data.img,
            recommendedStocks: [],
            rank: data.rank
        }

        return user

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
                if(res.data!=undefined){
                    this._currentStock = {
                        ...res.data[0]
                    }
                // const stockChart = new Chart(stockChart, {
                //     type: 'line', 
                //     data: {
                //       labels:[],
                //       datasets: [


                //           ]
                //     },
                //     options: {}
                // })
            })


    }


    async getStocks() {
        await $.get(`/stocks`)
            .then(async response => {
                this._stocks = response
                // this._stocks = JSON.parse(response)
                this._recommendations = response
            })
    }


    async getRecommendationsByStockSymbol(stockSymbol) {
        const response = await $.get(`/recommendationsSS/${stockSymbol}`)
            

        this._recommendations = response
        for(let r of this._recommendations) {
            const relUser = await this.getUserData(r.user)
    
            r.user = relUser
        }
    }

    async getRecommendationsByUserId(uid) {
        const response = await $.get(`/recommendationsUid/${uid}`)
            

        this._recommendations = response
        for(let r of this._recommendations) {
            const relUser = await this.getUserData(r.user)
    
            r.user = relUser

        }
    }

    async getRecommendation(recommendationId) {
        await $.get(`/recommendation/${recommendationId}`)
            .then(data => {
                this._currentRecommendation = {

                    recommendationId: data._id,
                    stockSymbol: data.stockSymbol,
                    currentDate: data.currentDate,
                    forcastDate: data.forcastDate,
                    currentValuw: data.currentValuw,
                    forcastValue: data.forcastValue,
                    user: data.user
                }
            })
    }


    async saveRecommendation(forcastedPrice,forcastedDate) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '/' + dd + '/' + yyyy;

        let newRec = {
            user: "5e53d0a0cfcd271840cc63c7",
            stockSymbol: this._currentStock.symbol,
            currentDate: today,
            forcastDate: forcastedDate,
            currentValuw:this._currentStock.price,
            forcastValue:forcastedPrice
        }
        await $.post('/recommendation', newRec)
    }

}