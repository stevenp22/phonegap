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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    hola: function(){
        alert('hola mundo');
    },
    leerMock: function (option){
        if (option == 1) {
            $.ajax({
               url:"http://www.mocky.io/v2/5d39a3df2f000071006ebcf8",
               success: function (result){
                   var htmlResult = "<table class='table' border='1' id='resultado'>";
                   htmlResult += "<tr>";
                   htmlResult += "<th>Id</th>";
                   htmlResult += "<th>Name</th>";
                   htmlResult += "<th>College</th>";
                   htmlResult += "</tr>";
                   for (i in result.students){
                       htmlResult += "<tr>";
                       htmlResult += "<td>"+result.students[i].id+"</td>";
                       htmlResult += "<td>"+result.students[i].name+"</td>";
                       htmlResult += "<td>"+result.students[i].college+"</td>";
                       htmlResult += "</tr>";
                   }
                   htmlResult += "</table>";
                   document.getElementById('result').innerHTML= htmlResult;

               },
                statusCode: {
                    200: function () {
                        //$("#exampleModal").modal();
                        alert('exito con los contactos');
                    }
                }
            })
        } else if (option == 2) {
            $('#result').load('http://www.mocky.io/v2/5d39a3df2f000071006ebcf8');
        }
       
    },
    
    mostrarContactos: function (){
        var options = new ContactFindOptions();
        options.filter   = "María";
        options.multiple = true;
        options.desiredFields = [navigator.contacts.fieldType.id];
        options.hasPhoneNumber = true;
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        //BUSCAR CONTACTOS
        navigator.contacts.find(fields, onSuccess, onError, options);
    },
    onSuccess: function (contacts) {
        alert(contacts.length);
        console.log(contacts.length);
        var table = document.getElementById("tableContactos");
        for (var i = 0; i <= contacts.length; i++){
            var row = table.insertRow(0);
            var cell1 = table.insertCell(0);
            var cell2 = table.insertCell(1);
            cell1.innerHTML = contacts[i].displayName;
            cell2.innerHTML = contacts[i].phoneNumbers[0];
        }
    },
    onError: function (contacError) {
        alert('error con los contactos');
    }
};
