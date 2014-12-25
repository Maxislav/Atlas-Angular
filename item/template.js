angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('item/block-one-object.html',
    "<div ng-repeat=\"obj in factoryGetDevices | orderBy:'text'\" class=\"block-one-object\" ng-mouseover=\"setCurrent(obj.imei)\"><div class=\"row-head\"><div>{{ (obj._dateTime || null ) | date:'yyyy.MM.dd'}}</div><div class=\"line\">{{obj.text}}</div><div class=\"row-footer-obj\"></div></div></div>"
  );


  $templateCache.put('item/container-blocks.html',
    "<div class=\"block-item target\" ng-class=\"item.target\"><div ng-controller=\"objectsContrl\"><div class=\"title\">Объекты<div class=\"button float-right\" ng-click=\"show('target')\">x</div></div><div ng-include=\"'item/block-one-object.html'\" class=\"list-objects\"></div><div class=\"info-object\" ng-include=\"'item/info-object.html'\"></div></div></div><div class=\"block-item rout\" ng-class=\"item.rout\"><div><div class=\"title\">Mаршруты<div class=\"button float-right\" ng-click=\"show('rout')\">x</div></div></div></div><div class=\"block-item zone\" ng-class=\"item.zone\"><div><div class=\"title\">Зоны<div class=\"button float-right\" ng-click=\"show('zone')\">x</div></div></div></div>"
  );


  $templateCache.put('item/footer.html',
    "<div class=\"table\"><div class=\"table-cell content\"><div>Map:</div><div name=\"lat\">{{factoryGetOptions.lat}}</div><div name=\"lng\">{{factoryGetOptions.lng}}</div><div>Mouse:</div><div>{{factoryGetOptions.mouselat}}</div><div>{{factoryGetOptions.mouselng}}</div></div></div>"
  );


  $templateCache.put('item/header.html',
    "<div style=\"position: absolute\"><div class=\"button\" ng-click=\"show('target')\">Объекты</div><div class=\"button\" ng-click=\"show('rout')\">Маршрут</div><div class=\"button\" ng-click=\"show('zone')\">Зоны</div></div><div style=\"float: right\"><div class=\"button\" ng-click=\"settingsShow()\">Настройки</div><div class=\"button\" ng-click=\"exit()\">Выход</div></div><div class=\"container-blocks\" ng-include=\"'item/container-blocks.html'\"></div>"
  );


  $templateCache.put('item/info-object.html',
    "<div class=\"row\"><div class=\"col-5\">Имя:</div><div class=\"col-7\">{{current.text}}</div></div><div class=\"row\"><div class=\"col-5\">Имеи:</div><div class=\"col-7\">{{current.imei}}</div></div><div class=\"row\"><div class=\"col-5\">Спутников:</div><div class=\"col-7\">{{current.satellites}}</div></div><div class=\"row\"><div class=\"col-5\">Дата:</div><div class=\"col-7\">{{ (current._dateTime || null ) | date:'yyyy.MM.dd'}}</div></div><div class=\"row\"><div class=\"col-5\">Время:</div><div class=\"col-7\">{{ (current._dateTime || null ) | date:'hh:mm:ss'}}</div></div>"
  );


  $templateCache.put('item/modal-exit.html',
    "<div ng-repeat=\"modal in modals\" class=\"animate-repeat\"><div ng-click=\"modal.close()\" class=\"button-close\"></div><div class=\"content-modal\">{{modal.text}}</div><div class=\"container-buttons-modal\"><div class=\"button\" ng-repeat=\"button in modal.buttons\" ng-click=\"button.action()\">{{button.text}}</div></div></div>"
  );


  $templateCache.put('item/setting-options.html',
    "<div class=\"button-close\" ng-click=\"settingsShow()\"></div><div><div class=\"title\">Настройки</div><div class=\"row\"><div class=\"col-6\">Тип карты</div><div class=\"col-6\"><select ng-model=\"data.map\" ng-options=\"map.map as map.text for map in arrMapType\"></select></div></div><div class=\"row\"><div class=\"col-6\">Часовой пояс</div><div class=\"col6-6\"><select ng-model=\"data.timeZone\" ng-options=\"time.text as time.text for time in timeZones\"></select></div></div><div class=\"title\">Устройства</div><div></div><div ng-repeat=\"device in factoryGetDevices | orderBy:'text'\" class=\"row device-row\"><input type=\"checkbox\" class=\"checkbox\" ng-model=\"checkbox[$index]\" ng-change=\"checkboxChange($index, device.imei)\"> <input ng-model=\"device.phone\" type=\"text\" class=\"text\"> <input ng-model=\"device.imei\" valid=\"int\" type=\"text\" class=\"text\"> <input ng-model=\"device.text\" type=\"text\" class=\"text\"></div><div class=\"row device-row\"><input ng-model=\"newDevice.phone\" class=\"text\"> <input ng-model=\"newDevice.imei\" class=\"text\"> <input ng-model=\"newDevice.text\" class=\"text\"></div><div class=\"container-buttons-modal\"><div class=\"button\" ng-click=\"addDevise()\">Добавить</div><div class=\"button\" ng-click=\"delDevice()\">Удалить</div></div></div>"
  );

}]);
