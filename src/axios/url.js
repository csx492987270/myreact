/**
 * 公共方法 $axios
 * @method $axios
 * @param[String] url 请求api baseUrl
 * @param[String] path 请求路径
 * @param[String] method 请求方法 默认GET
 * @param[Object] header 请求头
 * @param[Boolean] loading 是否需要loading 默认true
 * @param[Boolean] auth 是否需要token验证 默认true
 * @param[Number|String] successCode 接口返回成功状态码 默认2, 等于any时，所有状态都当成功处理
 * @param[String] contentType 默认application/x-www-form-urlencoded
 */
import axios from "axios";
let DEV_DEFAULT_URL =
  window.location.origin ||
  window.location.protocol +
  "//" +
  window.location.hostname +
  (window.location.port ? ":" + window.location.port : "");
DEV_DEFAULT_URL = ~DEV_DEFAULT_URL.indexOf("localhost") ? "" : DEV_DEFAULT_URL;
const baseUrl = `${DEV_DEFAULT_URL}`;
let tasks = [];

const Ajax = function (options = {}) {
  return new Promise((resolve, reject) => {
    let {
      url = baseUrl,
      path = "",
      method = "get",
      headers,
      params,
      timeout = 60000,
      successCode = 2,
      loading = true,
      auth = true,
      contentType = "application/x-www-form-urlencoded; charset=utf-8"
    } = options;
    const token = localStorage.getItem("token") || "";

    // 合并header
    headers = Object.assign(
      {},
      {
        "Content-Type": contentType
      },
      headers
    );

    // 接口是否需要token验证
    if (auth) {
      headers["X-lvbang-tId"] = localStorage.getItem("tenantId");
    }

    // axios config
    let config = {
      url: url + path,
      method,
      headers,
      timeout
    };

    if (method.toUpperCase() == "GET") {
      config.params = params;
    } else {
      config.data = params;
    }

    if (headers["Content-Type"].indexOf("x-www-form-urlencoded") > -1) {
      config.transformRequest = [
        function (data) {
          let ret = [];
          for (let it in data) {
            ret.push(
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it])
            );
          }
          return ret.join("&");
        }
      ];
    }

    // 是否显示loading
    if (loading) {
      tasks.push(path);
    }

    const hideLoading = () => {
      if (loading) {
        tasks = tasks.filter(v => v != path);
      }
    };

    axios(config)
      .then(res => {
        const data = res ? res.data : null;
        hideLoading();
        if (data.code === 200) {
          resolve(data);
        } else {

        }

      })
      .catch(err => {
        // alert(data.msg || "服务器繁忙")
        hideLoading();
        reject(err);
      });
  });
};

const get = (path, params, opt) =>
  Ajax({
    path,
    params,
    method: "get",
    ...opt
  });

const post = (path, params, opt) =>
  Ajax({
    path,
    params,
    method: "post",
    ...opt
  });

const deleteMethod = (path, params, opt) =>
  Ajax({
    path,
    params,
    method: "delete",
    ...opt
  });

const put = (path, params, opt) =>
  Ajax({
    path,
    params,
    method: "put",
    ...opt
  });

const postJson = (path, params, opt) => {
  // 后台需要将参数全部转string （待改进） --- start
  if (params) {
    for (let key in params) {
      if (typeof params[key] == "number") {
        params[key] = String(params[key]);
      }
    }
  }
  // 后台需要将参数全部转string --- end

  params = params ? JSON.stringify(params) : "";

  return Ajax({
    path,
    params,
    method: "post",
    contentType: "application/json",
    ...opt
  });
};

export { get, post, postJson, put, deleteMethod };
