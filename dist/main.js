let renderer = new Renderer()
let logic = new Logic()
const loadMainPage = async function () {
    renderer.renderMainManue()
    await logic.getStocks()
    renderer.renderStocksList(logic.stocks)
}
const loadStocksPage = async function (stockSymbol) {
    await logic.getStock(stockSymbol)
    renderer.renderStock(logic.currentStock)
    
    await logic.getRecommendations(stockSymbol)
    renderer.renderRecommendationList(logic.recommendations)
}
const loadUsersPage = async function (stockSymbol) {
    await logic.getStock(stockSymbol)
    renderer.renderStock(logic.currentStock)
    
    await logic.getRecommendations(stockSymbol)
    renderer.renderRecommendationList(logic.recommendations)
}
const getUsersPage = async function () {
    loadUsersPage($("#user-input").val())
}
const getStocksPage = async function () {
    loadStocksPage($("#stock-input").val())
}
$("#dataList").on("click", ".stockListBox", async function () {
    loadStocksPage($(this).find(".stockListSymbol")[0].innerText)
})
loadMainPage()let renderer = new Renderer()
let logic = new Logic()
const loadMainPage = async function () {
    renderer.renderMainManue()
    await logic.getStocks()
    renderer.renderStocksList(logic.stocks)
}
const loadStocksPage = async function (stockSymbol) {
    await logic.getStock(stockSymbol)
    renderer.renderStock(logic.currentStock)
    
    await logic.getRecommendations(stockSymbol)
    renderer.renderRecommendationList(logic.recommendations)
}
const loadUsersPage = async function (stockSymbol) {
    await logic.getStock(stockSymbol)
    renderer.renderStock(logic.currentStock)
    
    await logic.getRecommendations(stockSymbol)
    renderer.renderRecommendationList(logic.recommendations)
}
const getUsersPage = async function () {
    loadUsersPage($("#user-input").val())
}
const getStocksPage = async function () {
    loadStocksPage($("#stock-input").val())
}
$("#dataList").on("click", ".stockListBox", async function () {
    loadStocksPage($(this).find(".stockListSymbol")[0].innerText)
})
loadMainPage()