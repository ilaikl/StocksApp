
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

const getUser = function(){

    let userInput = $('#user-input').val()
    $('#dataList').empty()
    $('#currentData').empty()
    Logic.loadData(userInput).then(function (userId){
        render.userRender(userId)
    })


}

// $('#getUserBtn').on('click', async function(){
    
// const


// })
loadMainPage()
