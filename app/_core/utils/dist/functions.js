"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                      ? y["throw"] ||
                                        ((t = y["return"]) && t.call(y), 0)
                                      : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
exports.__esModule = true;
exports.generateColorVariants =
    exports.stringToEnum =
    exports.generateVCard =
    exports.formatNumber =
    exports.dataURLToFile =
    exports.dataURLToBlob =
    exports.convertYouTubeLinkToEmbed =
    exports.intent_processor =
    exports.client_token =
    exports.ucwords =
    exports.ucfirst =
    exports.esser =
        void 0;
var routes_1 = require("../config/routes");
var PaymentService_1 = require("../api/services/PaymentService");
var tinycolor2_1 = require("tinycolor2");
function esser(text, length) {
    return length > 1 ? text + "s" : text;
}
exports.esser = esser;
function ucfirst(str) {
    if (!str) {
        return "";
    }
    if (typeof str !== "string" || str.length === 0) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.ucfirst = ucfirst;
function ucwords(str) {
    if (typeof str !== "string" || str.length === 0) return "";
    return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}
exports.ucwords = ucwords;
function client_token() {
    return localStorage.getItem("client_token");
}
exports.client_token = client_token;
function intent_processor(intentData, token) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(intentData.from == routes_1.productItemRoute.name))
                        return [3 /*break*/, 2];
                    return [
                        4 /*yield*/,
                        PaymentService_1.PaymentService.makePayment(
                            intentData.data.file,
                            intentData.data.code,
                            intentData.data.name,
                            intentData.data.familyName,
                            intentData.data.companyName,
                            intentData.data.qty,
                            token,
                            intentData.data.fileName,
                        ),
                    ];
                case 1:
                    return [2 /*return*/, _a.sent().data.url];
                case 2:
                    return [2 /*return*/, ""];
            }
        });
    });
}
exports.intent_processor = intent_processor;
function convertYouTubeLinkToEmbed(url) {
    // Expression régulière pour extraire l'ID de la vidéo
    var videoIdMatch = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
    );
    var videoId = videoIdMatch ? videoIdMatch[1] : url;
    if (videoId) {
        // Construire l'URL d'intégration
        return "https://www.youtube.com/embed/" + videoId;
    }
    return url; // Retourne null si l'ID de la vidéo n'a pas pu être extrait
}
exports.convertYouTubeLinkToEmbed = convertYouTubeLinkToEmbed;
function dataURLToBlob(dataURL) {
    // Extraire la partie Base64 après "base64,"
    var byteString = atob(dataURL.split(",")[1]);
    // Créer un tableau d'octets
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    // Extraire le type MIME de la chaîne DataURL
    var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    // Créer un Blob à partir du tableau d'octets et du type MIME
    return new Blob([ia], { type: mimeString });
}
exports.dataURLToBlob = dataURLToBlob;
function dataURLToFile(dataURL, fileName) {
    // Convertir la DataURL en Blob
    var blob = dataURLToBlob(dataURL);
    // Créer un objet File à partir du Blob
    return new File([blob], fileName, { type: blob.type });
}
exports.dataURLToFile = dataURLToFile;
function formatNumber(num) {
    var absNum = Math.abs(num);
    var sign = num < 0 ? "-" : "";
    if (absNum >= 1e9) {
        return sign + (absNum / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (absNum >= 1e6) {
        return sign + (absNum / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (absNum >= 1e3) {
        return sign + (absNum / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return sign + absNum.toString();
}
exports.formatNumber = formatNumber;
function generateVCard(firstName, lastName, phoneNumber, email) {
    // Structure de la vCard
    var vCard =
        "\nBEGIN:VCARD\nVERSION:3.0\nFN:" +
        firstName +
        " " +
        lastName +
        "\nN:" +
        lastName +
        ";" +
        firstName +
        ";;;\nTEL;TYPE=CELL:" +
        phoneNumber +
        "\nEMAIL:" +
        email +
        "\nEND:VCARD\n    ";
    // Créer un blob contenant les données de la vCard
    var blob = new Blob([vCard], { type: "text/vcard" });
    // Créer un lien de téléchargement
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = firstName + "_" + lastName + ".vcf";
    // Simuler un clic sur le lien pour déclencher le téléchargement
    a.click();
    // Libérer l'URL objet
    window.URL.revokeObjectURL(url);
}
exports.generateVCard = generateVCard;
function stringToEnum(enumObj, value) {
    // Vérifier si la chaîne correspond à une valeur de l'enum
    if (Object.values(enumObj).includes(value)) {
        return value;
    }
    return null;
}
exports.stringToEnum = stringToEnum;
function generateColorVariants(color) {
    var baseColor = tinycolor2_1["default"](color);
    return {
        base: baseColor.toString(),
        lighter: baseColor.lighten(20).toString(),
        darker: baseColor.darken(20).toString(),
        text: tinycolor2_1["default"]
            .mostReadable(baseColor, ["#ffffff", "#000000"])
            .toString(),
    };
}
exports.generateColorVariants = generateColorVariants;
