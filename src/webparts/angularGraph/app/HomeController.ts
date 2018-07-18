import * as angular from 'angular';
import { IGraphHelper } from './GraphHelper';
import { ISiteCollection } from './../models/ISiteCollection';
import { IListCollection } from './../models/IListCollection';
import { IAnnouncements } from './../models/IAnnouncements';
import { IGenericCreateItem } from './../models/IGenericCreateItem';

export default class HomeController {
    public static $inject: string[] = ['$rootScope', '$scope', '$http', 'GraphHelper', '$log'];
    public hello: any = require('hellojs');

    // public variables
    public displayName: string;
    public vwSC: boolean = false;
    public vwLists: boolean = false;
    public vwListItm: boolean = false;
    public vwCreateItem: boolean = false;
    public siteCollection: Array<ISiteCollection>;
    public listCollection: Array<IListCollection>;
    public itemCollection: Array<IAnnouncements>;
    public createItemTitle: string;

    // private variables
    private _siteId: string;
    private _listId: string;

    constructor(
        private $rootScope: angular.IRootScopeService,
        private $scope: angular.IScope,
        private $http: angular.IHttpService,
        private graphHelper: IGraphHelper,
        private $log: angular.ILocaleService
    ) {
        this._initAuth();
    }

    private _initAuth(): void {
        if(localStorage.getItem['auth']) {
            this._processAuth();
        } else {
            let auth: any = this.hello('aad').getAuthResponse();
            if(auth != null) {
                localStorage.setItem('auth', angular.toJson(auth));
                this._processAuth();
            }
        }
    }    
}