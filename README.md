# WeatherWEBAPI

Foi construido um WEB APP, utilizando a API do _[OpenWeatherMap](https://openweathermap.org/api)._

Ao entrar com o nome da cidade onde irá ser apresentado os dados de temperatura, o app irá consumir a API utilizando a função fetch com o método Get.
O app passa para a URL o parâmetro da cidade solicitada (cityname) e tem o retorno de um arquivo json com os dados requisitados.

Os dados são requisitados, tratados e apresentados utilizando Javascript.

Nas próximas versão será realizado a integração com uma base de dados, para que os dados sejam armazenados e somente realize o consumo da API caso não tenha dados OU os dados sejam muito antigos.
