/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var stringMatching = jasmine.stringMatching;

var addresses = [
		'Биробиджан, Еврейская автономная область, Россия',
		'Екатеринбург, Свердловская обл., Россия',
		'Великий Новгород, Новгородская обл., Россия',
		'Комсомольск-на-Амуре, Хабаровский край, Россия',
		'Нижний Новгород, Нижегородская обл., Россия',
		'Нижний Тагил, Свердловская обл., Россия',
];

describe('multibyte encoding', function() {
  var googleMaps = require('./service');
  
  function expectOK(response) {
    expect(response.status).toBe(200);
    expect(response.json.status).toBe('OK');
    return response;
  }

  it('formatted_address', function(done) {
  	checkGeocode(addresses[0])
  	.then(() => checkGeocode(addresses[1]))
  	.then(() => checkGeocode(addresses[2]))
  	.then(() => checkGeocode(addresses[3]))
  	.then(() => checkGeocode(addresses[4]))
  	.then(() => checkGeocode(addresses[5]))
    .then(done, fail);
  });
  
  function checkGeocode(address) {
    return googleMaps.geocode({
        	address: address,
        	language: 'ru',
        	region: 'ru',
    	}).asPromise()
    	.then(expectOK)
    	.then(function(response){
    	  expect(response.json.results[0].formatted_address).toEqual(stringMatching(address));
    	});
  }
});
