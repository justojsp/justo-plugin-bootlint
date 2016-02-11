//imports
import {simple} from "justo";

//api
module.exports = simple({ns: "org.justojs.plugin", name: "bootlint"}, require("./lib/op").default);
