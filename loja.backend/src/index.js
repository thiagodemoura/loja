import express from "express";
import cors from "cors";
import config from "./config.json";
import fileUpload from "express-fileupload";
import winston from "winston";
import myParser from "body-parser";
import expressWinston from "express-winston";
import cookieParser from "cookie-parser";
import LojaController from "./controllers/loja.controller";

const app = express();
const port = process.env.PORT || config.port;
// 3rd party middleware

app.use([
  fileUpload({ debug: true }),
  cookieParser(),
  myParser.urlencoded({ extended: true }),
  myParser.json({ type: "application/json" }),
  cors({ exposedHeaders: config.corsHeaders }),

  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  }),
]);
new LojaController(app);
app.listen(port);

console.log("Servidor Rodando na Porta: " + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
