let renderer = new Renderer()
let logic = new Logic()





const loadMainPage = async function () {
    renderer.renderMainMenu()
    await logic.getStocks()
    renderer.renderStocksList(logic.stocks)
}

const loadStocksPage = async function (stockSymbol) {

    await logic.getStock(stockSymbol)
    renderer.renderStock(logic.currentStock)

    await logic.getRecommendationsByStockSymbol(stockSymbol)
    renderer.renderRecommendationList(logic.recommendations)
}

const loadUsersPage = async function (userId) {
    await logic.getUser(userId)
    renderer.renderUser(logic.currentUser)

    await logic.getRecommendationsByUserId(userId)
    renderer.renderRecommendationList(logic.recommendations)
}


const loadRecommendationsPage = async function (recommendationId) {
    await logic.getRecommendation(recommendationId)
    renderer.renderRecommendation(logic.currentRecommendation)

    renderer.renderRecPageBottom()
    // await logic.getRecommendationsByUserId(userId)
    // renderer.renderRecommendationList(logic.recommendations)
}


const getUsersPage = async function () {
    loadUsersPage($("#user-input").val())
}

const getStocksPage = async function () {
    loadStocksPage($("#stock-input").val())
}


const followUser = async function () {


}

const submitRecommendation = async function () {
    console.log($("#priceInput").val()+"   "+$("#dateInput").val());
    
    await logic.saveRecommendation($("#priceInput").val(),$("#dateInput").val())
   loadStocksPage(logic.currentStock.symbol)
}

const closeForm = function () {
    $("#myForm").css({ "display": "none" })
}

const createRecommendation = async function () {
    $("#myForm").css({ "display": "block" })

}


const invest = async function () {


    await logic.invest(data)
}

$("#dataList").on("click", ".stockListBox", async function () {

    loadStocksPage($(this).find(".stockListSymbol")[0].innerText)

})



$("#dataList").on("click", ".recommendationListBox", async function () {
    console.log($(this).data().id);

    loadRecommendationsPage($(this).data().id)

})




loadMainPage()
