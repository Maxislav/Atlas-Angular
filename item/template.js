angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('item/block-one-object.html',
    "<div ng-repeat=\"obj in factoryGetDevices | orderBy:'text'\" class=\"block-one-object\" ng-click=\"setCurrent(obj.imei)\"><div class=\"row-head\"><div class=\"row-footer-obj\"><div class=\"row\"><div class=\"col-5\"><h3>{{obj.text}}</h3></div><div class=\"col-5\">{{obj.phone}}</div><div class=\"col-2 text-right\"><div state-obj elapsed-time=\"obj._elapsedTime\" device=\"obj\" speed=\"obj.speed\"></div></div></div><div class=\"row\"><timer start-time=\"obj._dateTime\">{{days}} days, {{hours}} hours, {{minutes}} min, {{seconds}} sec.</timer></div><div class=\"hidden-line\" style=\"margin-top: 5px\"></div><div class=\"row\"><div class=\"col-4\"><div>{{ (obj._dateTime || null ) | date:'yy.MM.dd'}}</div><div>{{ (obj._dateTime || null ) | date:'HH.mm.ss'}}</div></div><div class=\"col-2\"><div class=\"row\">Сп</div><div class=\"row\">{{obj.satellites}}</div></div><div class=\"col-2\"><div class=\"row\">Ск</div><div class=\"row\">{{obj.speed}}</div></div><div class=\"col-2\"><div class=\"row\">Бат</div><div class=\"row\">{{obj.zaryad}}</div></div></div><div class=\"row\"></div></div></div></div>"
  );


  $templateCache.put('item/container-blocks.html',
    "<div class=\"block-item target\" ng-class=\"item.target\"><div ng-controller=\"objectsContrl\"><div class=\"title\"><div>Объекты<div class=\"button-close float-right\" ng-click=\"show('target')\"></div></div></div><div ng-include=\"'item/block-one-object.html'\" class=\"list-objects\"></div></div></div><div class=\"block-item rout\" ng-class=\"item.rout\"><div><div class=\"title\">Mаршруты<div class=\"button float-right\" ng-click=\"show('rout')\">x</div></div></div></div><div class=\"block-item zone\" ng-class=\"item.zone\"><div><div class=\"title\">Зоны<div class=\"button float-right\" ng-click=\"show('zone')\">x</div></div></div></div>"
  );


  $templateCache.put('item/elapsed-post.html',
    "<div class=\"elapsed-post\"><timer start-time=\"factoryGetDevices.timePost\"><div tik>{{minutes}} min {{seconds}} sec</div></timer></div>"
  );


  $templateCache.put('item/footer.html',
    "<div class=\"table\"><div class=\"table-cell content\"><div>Map:</div><div name=\"lat\">{{factoryGetOptions.lat}}</div><div name=\"lng\">{{factoryGetOptions.lng}}</div><div>Mouse:</div><div>{{factoryGetOptions.mouselat}}</div><div>{{factoryGetOptions.mouselng}}</div></div></div>"
  );


  $templateCache.put('item/header.html',
    "<div style=\"position: absolute\"><div class=\"button\" ng-click=\"show('target')\">Объекты</div><div class=\"button\" ng-click=\"show('zone')\">Зоны</div><div class=\"button\" ng-click=\"serviceShowElements.showReport=!serviceShowElements.showReport\">Отчет</div></div><div style=\"float: right\"><div class=\"button\" ng-click=\"settingsShow()\">Настройки</div><div class=\"button\" ng-click=\"exit()\">Выход</div></div><div class=\"container-blocks\" ng-include=\"'item/container-blocks.html'\"></div>"
  );


  $templateCache.put('item/info-object.html',
    "<div class=\"info-object\" ng-show=\"serviceShowElements.showInfo\"><div class=\"row\">{{factoryGetDevices.current.imei}}</div><div class=\"row\">{{factoryGetDevices.current.text || 'None'}}</div><div class=\"row\" ng-if=\"factoryGetDevices.current._dateTime\"><timer start-time=\"factoryGetDevices.current._dateTime\">{{days}} days, {{hours}} hours, {{minutes}} min, {{seconds}} sec.</timer></div><div class=\"row\" ng-if=\"factoryGetDevices.current.satellites\"><div class=\"col-5\">Спутников:</div><div class=\"col-7\">{{factoryGetDevices.current.satellites}}</div></div><div class=\"row\" ng-if=\"factoryGetDevices.current._dateTime\"><div class=\"col-5\">Дата:</div><div class=\"col-7\">{{ (factoryGetDevices.current._dateTime || null ) | date:'yyyy.MM.dd'}} {{ (factoryGetDevices.current._dateTime || null ) | date:'HH:mm:ss'}}</div></div><div class=\"row\">{{factoryGetDevices.current.lat}} {{factoryGetDevices.current.lng}}</div><div class=\"row\">{{factoryGetDevices.current.speed}}</div></div>"
  );


  $templateCache.put('item/modal-exit.html',
    "<div ng-repeat=\"modal in modals\" class=\"animate-repeat\"><div ng-click=\"modal.close()\" class=\"button-close\"></div><div class=\"content-modal\">{{modal.text}}</div><div class=\"container-buttons-modal\"><div class=\"button\" ng-repeat=\"button in modal.buttons\" ng-click=\"button.action()\">{{button.text}}</div></div></div>"
  );


  $templateCache.put('item/report.html',
    "<div ng-controller=\"reportContrl\">Отчет<div class=\"row\"><div class=\"col-4\">Дата</div><div class=\"col-8\"><calendar after=\"after\" before=\"before\" link=\"true\"></calendar></div></div><div class=\"row\"><div class=\"col-4\"><span>Устройство</span></div><div class=\"col-8\"><select ng-model=\"currentImei\" ng-options=\"device.imei as device.text for device in devices\" ng-change=\"changeCurrent()\"></select></div></div><div class=\"row container-buttons\"><div class=\"button\" ng-click=\"showTrack()\">Отбобразить</div><div class=\"button\">Сохранить</div><div class=\"button\">Скрыть</div></div></div>"
  );


  $templateCache.put('item/setting-options.html',
    "<div class=\"button-close\" ng-click=\"settingsShow()\"></div><div><div class=\"title\">Настройки</div><div class=\"row\"><div class=\"col-6\">Тип карты</div><div class=\"col-6\"><select ng-model=\"data.map\" ng-options=\"map.map as map.text for map in arrMapType\"></select></div></div><div class=\"row\"><div class=\"col-6\">Часовой пояс</div><div class=\"col-6\"><select ng-model=\"data.timeZone\" ng-options=\"time.text as time.text for time in timeZones\"></select></div></div><div class=\"row\"><div class=\"col-6\">Локация карты</div><div class=\"col-6\"><div class=\"opta\">{{data.lat}} {{data.lng}}</div></div></div><div class=\"row\"><div class=\"col-6\">Отображать доп. инфо</div><div class=\"col-6\"><input type=\"checkbox\" style=\"width: 16px\" ng-model=\"serviceShowElements.showInfo\"></div></div><div class=\"title\">Устройства</div><div></div><div ng-repeat=\"device in factoryGetDevices | orderBy:'text'\" class=\"row device-row\"><div class=\"col-1\"><input type=\"checkbox\" ng-model=\"checkbox[$index]\" ng-change=\"checkboxChange($index, device.imei)\"></div><div class=\"col-4\"><input ng-model=\"device.text\" type=\"text\"></div><div class=\"col-4\"><input ng-model=\"device.imei\" valid=\"int\" type=\"text\" readonly></div><div class=\"col-3\"><input ng-model=\"device.phone\" type=\"text\"></div></div><div class=\"row device-row\"><div class=\"col-1\">&nbsp</div><div class=\"col-4\"><input ng-model=\"newDevice.text\" class=\"text\"></div><div class=\"col-4\"><input ng-model=\"newDevice.imei\" valid=\"int\" class=\"text\"></div><div class=\"col-3\"><input ng-model=\"newDevice.phone\" class=\"text\"></div></div><div class=\"alert-row text-center\" ng-class=\"alertShow\">{{alertMess}}</div><div class=\"container-buttons-modal\"><div class=\"button\" ng-click=\"addDevise()\">Добавить</div><div class=\"button\" ng-click=\"delDevice()\">Удалить</div></div></div>"
  );

}]);
