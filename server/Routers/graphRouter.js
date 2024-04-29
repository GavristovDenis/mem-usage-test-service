const Router = require("express")
const graphController = require("../Controllers/graphController")
const graphRouter = new Router

graphRouter.get('/getRam', graphController.getRam)



module.exports = graphRouter