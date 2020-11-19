export default class FetchUtils {
  static getQueryString(queryParams) {
    if (queryParams) {
      var params = Object.keys(queryParams).map(function (paramName) {
        return [paramName, encodeURIComponent(queryParams[paramName])].join(
          "="
        );
      });
      return params.length > 0 ? "?" + params.join("&") : "";
    } else {
      return "";
    }
  }
  static async checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      let data = "";
      let error = null;
      if (response.status === 404) {
        data = "Not Found";
        error = new Error(data);
      } else if (response.status >= 500) {
        data = "Server not available";
        error = new Error(data);
      } else {
        data = await response.json();
        if (data.code && data.message) {
          error = new Error(data.code + " - " + data.message);
        } else if (data.error) {
          error = new Error(data);
          error.message = data.error;
          error.debug = data.error_description;
        } else if (data.status) {
          error = new Error(data);
          error.message = data.message;
          error.debug = data.debugMessage;
        } else {
          error = new Error(data);
        }
      }

      throw error;
    }
  }

  static toJson(response) {
    return response.json();
  }

  static toBlob(response) {
    return response.blob();
  }

  static toText(response) {
    return response.text();
  }
  static toError(err) {
    throw Error(err.message ? err.message : err);
  }

  static async toFile(response) {
    let contentDisposition = response.headers.get("Content-Disposition");
    if (contentDisposition) {
      contentDisposition = contentDisposition.substring(
        contentDisposition.lastIndexOf("=") + 1,
        contentDisposition.length
      );
    }
    return {
      filename: contentDisposition,
      blob: await response.blob,
    };
  }
  static hFetch(url, options) {
    return fetch(url, options)
      .then(this.checkStatus)
      .then(this.toJson)
      .catch(this.toError);
  }
  static post(url, object, headers = {}) {
    let newHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    let options = {
      method: "POST",
      mode: "cors",
      headers: newHeaders,
      body: JSON.stringify(object),
    };
    return this.hFetch(url, options);
  }
  static get(url, object = null, headers = {}) {
    let newHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    let options = {
      method: "GET",
      mode: "cors",
      headers: newHeaders,
    };
    return this.hFetch(url + this.getQueryString(object), options);
  }

  static delete(url, object = null, headers = {}) {
    let newHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    let options = {
      method: "DELETE",
      mode: "cors",
      headers: newHeaders,
    };
    return this.hFetch(url + this.getQueryString(object), options);
  }
}
