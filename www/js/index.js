/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

$(document).ready(() => {
    if((cordova.platformId != 'electron' && getCookie('token') === undefined) || (cordova.platformId === 'electron' && localStorage.getItem("token") === null))
    {
        $('<link/>', {
            rel: 'stylesheet',
            type: 'text/css',
            href: 'css/login.css'
        }).appendTo('head');
        $('title').text('Dziennik Mercury: Logowanie');
        $('body').load('login.html');
    }
    else
    {
        $('<link/>', {
            rel: 'stylesheet',
            type: 'text/css',
            href: 'css/main.css'
        }).appendTo('head');
        $('title').text('Dziennik Mercury: Strona Główna');
        $('body').load('main.html');
    }
});