
	angular.module('socialModule')
		.factory('activityStreamModel', activityStreamModel);

	activityStreamModel.$inject = ['$filter', '$q', '$rootScope', 'thumbnailCache','srModel','userModel','supportService', 'supportModel'];

	function activityStreamModel($filter,$q, $rootScope, thumbnailCache,srModel,userModel, supportService, supportModel) {
		$rootScope.srModel=srModel;
		$rootScope.userModel=userModel;
		$rootScope.supportModel = supportModel;

		var
			self = {
				items: [],
				columnInfo:[],
				namespace: 'BMCServiceDesk__',
				MAX_ATTACHMENTS_TO_DISPLAY: 4,
				SERVICE_REQUESTS_FILTER_LOCAL_STORAGE_KEY: 'social.serviceRequestFilter',
				currentPageNo:1,
				cache: {},
				allItemsById: {},
				mentionRegex: /@\[(.+?)\]\|(.+?)\|\((user|asset|location|service|group|application|service_offering)\)/g
			};
		self.supportService = supportService;
		/**
		 * Load activity stream items
		 * @param options Object with options:
		 * - type: type of activity stream's owner
		 * - elementId: ID of activity stream's owner
		 * - own: boolean flag, used if activity stream for logged-in user is loading
		 * - loadMorePastItems: boolean flag, used if earlier past items are returned
		 * - typeFilter: filter for activity item type
		 * - serviceRequestsStatuses: a string with comma-separated statuses that selected in the SR filter
		 * @returns {*} Promise that will be resolved with cache object for specified stream
		 */
		self.getActivityStream = function (options) {
			// for correct cache use, both element type and ID are needed
			//if (!options.type || !options.elementId) {
			if (!options.type ) {	
				return $q.reject();
			}

			var cacheKey = options.type + options.elementId,
				cache,
				requestParams = {},
				activityStreamOptions = {
					loadMorePastItems: options.loadMorePastItems,
					typeFilter: options.typeFilter,
					forceServerCall: options.isCacheResetNeeded
				};

			// cache for user's own stream will be separate
			if (options.own) {
				cacheKey += 'home';
			}

			// cache reading / initialization
			if (!self.cache[cacheKey]) {
				self.cache[cacheKey] = {
					id: cacheKey,
					allowMorePastItems: true,
					allowMorePastItemsByType: {}
				};
			}
			cache = self.cache[cacheKey];

			if (options.isCacheResetNeeded) {
				_.each(_.clone(cache.items), function (activityItem) {
					if (!options.typeFilter || activityItem.feedObjectType === options.typeFilter) {
						self.removeActivityItemFromCache(self.allItemsById[activityItem.id]);
					}
				});
				cache.newestItemDatesByType[options.typeFilter] = null;
				cache.oldestItemDatesByType[options.typeFilter] = null;
			}

			function validateFilterStatuses(result) {
				// check whether the statuses selected in the filter are the same as requested in the current request,
				// if not, it means that a new call with a new status values has been already initialed,
				// and currently-processed request is not needed anymore, so stop the processing
				var isFilterStatusesValid = self.serviceRequestsFitlerStatusesString
					&& self.serviceRequestsFitlerStatusesString === requestParams.statusCode;
				return isFilterStatusesValid ? $q.when(result) : $q.reject('');
			}
			
			function fetchActivity(){
					var deferred = $q.defer();  
					var nullVar=[];
					var pageNo;
					self.isNextEnabled=false;
					self.isPreviousEnabled=false;
					if(options.currentPageNo)
						pageNo=options.currentPageNo;
					else
						pageNo=self.currentPageNo;
					var filterVal;
					if(options.typeFilter)
						filterVal= options.typeFilter;
					else
						filterVal = '';
					var params = new Object(); 
					params['searchStr'] = options.searchStr;
					params['state'] = options.state;
					params['status'] = options.status;
					params['beId'] = (options.beId != undefined && options.beId != null && options.beId != '') ? options.beId : null;
					params['isCsvCreation'] = (options.isCsvCreation) ? options.isCsvCreation : false;
					Visualforce.remoting.Manager.invokeAction(_RemotingActions.getTicketsAndSRs,pageNo,filterVal,params,function(result, event) {	
							if (event.status) {		
							    var formattedResult=processActivities(result);
								self.isNextEnabled=result.isNextEnabled;
								self.isPreviousEnabled=result.isPreviousEnabled;
								self.headerInfo=result.headerInfo;
								itemType='activity';
								var result=[];
								result.push(formattedResult);
								deferred.resolve(result);
								return result;
							}else{
								deferred.reject();
							}
						});	
					return deferred.promise;	
				
			}
			
			function fetchOthersActivity(){				
					var deferred = $q.defer();  
					var nullVar=[];
					self.isNextEnabled=false;
					self.isPreviousEnabled=false;
					var pageNo;
					var accName='others';
					if(options.currentPageNo)
						pageNo=options.currentPageNo;
					else
						pageNo=self.currentPageNo;
					var filterVal;
					if(options.typeFilter)
						filterVal= options.typeFilter;
					else
						filterVal = '';
					var params = new Object(); 
					params['searchStr'] = options.searchStr;
					params['state'] = options.state;
					params['status'] = options.status;
					params['beId'] = (options.beId != undefined && options.beId != null && options.beId != '') ? options.beId : null;
					params['isCsvCreation'] = (options.isCsvCreation) ? options.isCsvCreation : false;
					Visualforce.remoting.Manager.invokeAction(_RemotingActions.fecthOtherSRandIncident,accName,pageNo,filterVal,params,function(result, event) {				 
						
							if (event.status) {		
							    self.isNextEnabled=result.isNextEnabled;
								self.isPreviousEnabled=result.isPreviousEnabled;
							    var formattedResult=processActivities(result);
								itemType='activity';
								var result=[];
								result.push(formattedResult);
								deferred.resolve(result);
								return result;
							}else{
								deferred.reject();
							}
						});	
					return deferred.promise;	
				
				}
							function processActivities(result){
							    var feedItems=[];
								var feedItemsById={};
								var columnInfoList = result.headerInfo;
								 _.each(result.recordInfo,function(record,keyRecord){
									 var fieldsToDisplay=[];
									 var feedData={};									
									 feedData.isRequest = false;
									 feedData.isTicket = true;
									 var rowData = record;
									 _.each(record,function(value,key){
									 	if(key=="Name"){
											feedData['feedText'] = value;
											feedData['title']=value;
										} else if(key.indexOf('Id')>-1 && key != 'OwnerId' && key != 'CreatedById' && key != 'LastModifiedById'){
											feedData['id']=value;
											feedData['srId']=value;
										} else if(key.indexOf('FKRequestDefinition__c')>-1){
											feedData.isRequest = true;
											feedData.isTicket = false;
											feedData.srd = value;
											feedData.srdKey = key;
										//} else if(key.indexOf('incidentDescription__c')>-1){
										//	feedData.Description=value;
										//} else if(key.indexOf('Service_Request_Title__c')>-1){
										//	feedData['srdTitle']=value;
										} else if(key.indexOf('FKStatus__r')>-1) {
											feedData.dispStatus=value.Name;	
											feedData.ActionStatus = false;
											_.each(result.selectedActionStatuses,function(record,keyRecord){
												if(record == value.Name)
													feedData.ActionStatus = true;
											});
										}else if(key.indexOf('FKClient__r')>-1) {
											feedData.clientName = value.Name;
										}else if(key.indexOf('state__c')>-1){
											feedData.dispState=value;	
										}
										else {
											var fieldInfo = {};
											var columnInfo = columnInfoList[key];
											
											
											if (columnInfo != undefined && ( columnInfo.colDataType != "REFERENCE" || (columnInfo.colDataType == "REFERENCE" && key.indexOf('__r')<=-1))) {
												fieldInfo.type = columnInfo.colDataType;
												fieldInfo.label = columnInfo.colLabel;
												fieldInfo.key = key;

												if(fieldInfo.type == "REFERENCE"){
													var referenceKey=key.replace('__c','__r');
													if (key == 'OwnerId') {referenceKey = 'Owner';}													
													else if (key == 'CreatedById') {referenceKey = 'CreatedBy';}
													else if (key == 'LastModifiedById') {referenceKey = 'LastModifiedBy';}
													if(rowData[referenceKey] && rowData[referenceKey].Name) {
														fieldInfo.value = rowData[referenceKey].Name;
													} else {
														return;
													}
												} else if (fieldInfo.type == "STRING") {
													fieldInfo.type = "TEXTAREA";
													fieldInfo.value = value;
												} else if (fieldInfo.type == "FORMULA" || fieldInfo.type == "RICHTEXTAREA") {
														value = value.replace(/&quot;/g, '"');
														value = value.replace(/&#39;/g, "'");
														value = value.replace(/&lt;/g, '<');
														value = value.replace(/&gt;/g, '>');
														value = value.replace(/&amp;/g, '&');
														fieldInfo.value=value;
												} else if (fieldInfo.type == "URL") {
														fieldInfo.value=value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(http[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
												} else {
														fieldInfo.value=value;
												}
												fieldsToDisplay.push(fieldInfo);
											}
										}
									});
									var ticketDetails={};
									ticketDetails.isRequest=feedData.isRequest;
									ticketDetails.isTicket=feedData.isTicket;
									ticketDetails['id']=record.Id;		
									ticketDetails[feedData.srdKey]=feedData.srd;
									ticketDetails['feedId']=record.Id;									 
									feedData['feedData']=ticketDetails;		
									feedData['id']=record.Id;
									feedData['srId']=record.Id;
									feedData['dynamicFields']=fieldsToDisplay;		
									feedData['feedObjectType']='request';	
									feedItemsById[record.Id]=feedData;
									
									feedData['createDate']=record.CreatedDate;
									ticketDetails['createDate']=record.CreatedDate;
									
									feedItems.push(feedData);

									//ticketDetails['modifiedDate']=record.LastModifiedDate;
									//ticketDetails['modifiedDate']=new Date(moment.tz(feedData['modifiedDate'], userTimeZone).format('MM/dd/yyyy HH:mm:SS'));
									//ticketDetails['id']=record.Id;		
									//ticketDetails['feedId']=record.Id;									 
									//feedData.Description=ticketDetails.Description;
									//feedData.isRequest=ticketDetails.isRequest;
									//feedData.isTicket=ticketDetails.isTicket;
									//feedData['srdTitle']=ticketDetails.srdTitle;
									
									 
								 }); 								
								var formattedResult={
									'items' : feedItems,
									'itemsById': feedItemsById,
									'id' : userModel.userId
								};
				    return formattedResult;								
				
				}			
			return activityStreamWithCache(function () {
				/*if (options.own) {
					cache.loadingPromise = fetchActivity();
				} else {
					requestParams.type = options.type;
					requestParams.element_id = options.elementId;
					requestParams.filter_types = options.typeFilter;
					if (options.typeFilter == 'request') {
						requestParams.statusCode = options.serviceRequestsStatuses;
						activityStreamOptions.preProcessResponse = validateFilterStatuses;
					}
					//cache.loadingPromise = activityStreamResource.getActivityStream(requestParams).$promise;
				}*/
				if(options.selfActivity){
					cache.items=[];
					cache.loadingPromise = fetchActivity();
				}	
			    else{
					cache.items=[];
					cache.loadingPromise = fetchOthersActivity();	
				}	
			}, requestParams, cache, activityStreamOptions);
		};


		/**
		 * Load activity stream notification items
		 * @returns {*} Promise that will be resolved with cache object for specified stream
		 */
		self.getActivityStreamNotifications = function () {
			var cache, requestParams = {};

			// cache reading / initialization
			if (!self.notificationsCache) {
				self.notificationsCache = {
					id: 'notifications'
				};
			}
			cache = self.notificationsCache;

			return activityStreamWithCache(function () {
				//cache.loadingPromise = activityStreamResource.getActivityStreamNotifications(requestParams).$promise;
			}, requestParams, cache);
		};


		/**
		 * Filters passed activity items by type and returns filtered array. It is assumed that items are already sorted.
		 * Filtered array is passed to setTimelineOptions() method before being returned
		 *
		 * @param items Array of activity items
		 * @param type {String} Desired item type
		 * @returns {*} Filtered array, with correct timelineOptions for every item
		 */
		self.filterActivityItemsByType = function (items, type) {
			if (!angular.isArray(items)) { return []; }

			var result = items.filter(function (item) {
				if(type=='Requests')
				return item.isRequest ;
			    else
				return item.isTicket;	
			});

			self.setTimelineOptions(result,true);

			return items;
		};


		/**
		 * Insert activity <code>item</code> into cache for given <code>objectType</code> and <code>objectId</code>
		 * @param item Activity item
		 * @param objectType Type of cache's owner object ('user', 'location' etc.)
		 * @param objectId ID of cache's owner object
		 */
		self.insertActivityItemIntoObjectCache = function (item, objectType, objectId) {
			var cacheKey = objectType + objectId;

			if (self.cache[cacheKey]) {
				insertActivityItemIntoCache(item, self.cache[cacheKey]);
				sortCachedStream(self.cache[cacheKey]);
			}

			if (self.cache[cacheKey + 'home']) {
				insertActivityItemIntoCache(item, self.cache[cacheKey + 'home']);
				sortCachedStream(self.cache[cacheKey + 'home']);
			}
		};


		/**
		 * Clears cache for specified element
		 * @param elementType Type of element
		 * @param elementId ID of element
		 */
		self.clearCacheForElement = function (elementType, elementId) {
			self.cache[elementType + elementId] = null;
			self.cache[elementType + elementId + 'home'] = null;
			self.notificationsCache = null;
		};


		/**
		 * Remove specified activity item from all cache objects, both regular and notification ones
		 * @param activityItem Activity item to remove
		 */
		self.removeActivityItemFromCache = function (activityItem) {
			function removeFromCache(cache) {
				if (cache && cache.itemsById[activityItem.id]) {
					var index = cache.items.indexOf(cache.itemsById[activityItem.id]);
					if (~index) {
						cache.items.splice(index, 1);
						// remove current cached stream from list of item's parent streams
						activityItem.parentStreams = _.without(activityItem.parentStreams, cache);
					}
					cache.itemsById[activityItem.id] = null;
				}
			}

			removeFromCache(self.notificationsCache);
			_.each(self.cache, removeFromCache);
			self.allItemsById[activityItem.id] = null;
		};


		/**
		 * Sets options for timeline-styled displays
		 * @param items Array of activity items
		 * @param [byCreateDate] Flag to determine if comparison should be done on 'createDate' instead of 'modifiedDate'
		 */
		self.setTimelineOptions = function (items, byCreateDate) {
			if (items) {
				for (var i = 0, l = items.length; i < l; i++) {
					var
						item = items[i],
						dateField = byCreateDate ? 'createDate' : 'modifiedDate', 
						options = {},
						itemDate = item[dateField].split(" ")[0];
					// check if item was modified today
					if (itemDate == todayDateVal.split(" ")[0]) {
						options.isToday = true;
						options.relativeDateLabel = selfServiceLabels.today;
					}

					// check if item was modified yesterday
					/*if (itemDate === moment().subtract('day', 1).format('YYYYMMDD')) {
						options.relativeDateLabel = 'yesterday';
					}*/

					// if previous item's date differs from current item's, set a flag
					if (!items[i - 1] || items[i - 1][dateField].split(" ")[0] != itemDate) {
						options.isFirstInGroup = true;
					}

					// if next item's date differs from current item's, set a flag
					if (!items[i + 1] || items[i + 1][dateField].split(" ")[0] != itemDate) {
						options.isLastInGroup = true;
					}

					item.timelineOptions = options;
				}
			}
		};


		/**
		 * Fetch activity item with given ID with its comments
		 * @param {String} activityItemId ID of activity item
		 * @returns {*} HTTP request promise
		 */
		self.getActivityItemWithComments = function (activityItemId) {
			if (self.allItemsById[activityItemId] && self.allItemsById[activityItemId].comments && self.allItemsById[activityItemId].comments.length) {
				return $q.when(1);
			} else {
				/*return activityStreamResource.getActivityItem({ id: activityItemId }).$promise
					.then(function (result) {
						if (result && result[0] && angular.isArray(result[0].items)) {
							processActivityItem(result[0].items[0]);
							self.allItemsById[activityItemId] = result[0].items[0];
						}
					});*/
			}
		};


		/**
		 * Post new item to activity stream
		 * @param {Object} data Options for new activity item. Fields depend on item type. See http://confluence.bmc.com:8080/x/HXJcD
		 * @param {Array} attachments Attachment data
		 * @returns {*} HTTP request promise
		 */
		self.postActivityItem = function (data, attachments) {
			/*var promise = activityStreamResource.PostActivityItem({}, data).$promise;

			return promise
				.then(function (data) {
					if (attachments && attachments.length) {
						var promises = [data];
						for (var i = 0, l = attachments.length; i < l; i++) {
							if (attachments[i].binaryData) {
								promises.push(activityStreamResource.addAttachmentToActivityItem({ itemType: 'activity', id: data.id, filename: attachments[i].filename }, attachments[i]).$promise);
							} else if (attachments[i].fileInput) {
								//promises.push(attachmentService.uploadFileWithIframe('activity', data.id, attachments[i].fileInput));
							}
						}
						return $q.all(promises);
					} else {
						return $q.all([data]);
					}
				})*/
		};


		self.postActivityItemLike = function (activityItemId) {
			//var promise = activityStreamResource.activityItemLike.post({ id: activityItemId }, {}).$promise;

			promise
				.then(function () {
					self.allItemsById[activityItemId].selfLike = true;
					self.allItemsById[activityItemId].likeCount++;
				});

			return promise;
		};

		self.shareActivityStreamItem = function (id, text) {
			//return activityStreamResource.shareActivityStreamItem({ id: id }, { text: text }).$promise;
		};

		self.deleteActivityStreamItem = function (id) {
			/*return activityStreamResource.DeleteActivityItem({ id: id }, {}).$promise
				.finally(function () {
					self.removeActivityItemFromCache(self.allItemsById[id]);
				});*/
		};

		self.deleteActivityItemLike = function (activityItemId) {
			/*var promise = activityStreamResource.activityItemLike.delete({ id: activityItemId }, {}).$promise;

			promise
				.then(function () {
					self.allItemsById[activityItemId].selfLike = false;
					self.allItemsById[activityItemId].likeCount--;
				});

			return promise;*/
		};


		/**
		 * Mark notification activity item as read
		 * @param notificationItemId ID of notification activity item
		 * @returns {*} HTTP request promise
		 */
		self.markStickyItemAsRead = function (notificationItemId) {
			var notificationItem = self.notificationsCache.itemsById[notificationItemId];

			notificationItem.markAsReadInProgress = true;

			/*return activityStreamResource.markStickyItemAsRead({ id: notificationItemId }, {}).$promise
				.then(function () {
					notificationItem.isSticky = false;
				})
				.finally(function () {
					notificationItem.markAsReadInProgress = false;
				});*/
		};

		/**
		 * Post new comment to specified activity item, and update list of comments in model
		 * @param {String} activityItemId ID of activity item
		 * @param {String} commentText Text of new comment
		 * @returns {*} HTTP request promise
		 */
		self.postActivityItemComment = function (activityItemId, commentText) {
			/*var promise = activityStreamResource.PostActivityItemComment({ id: activityItemId }, { comment: commentText }).$promise;

			promise.then(function (data) {
				processActivityItemComments(activityItemId, data);
			});

			return promise;*/
		};


		/**
		 * Replace @mention format with just '@' and name of mentioned object
		 * @param text Text to process
		 * @returns {string} Processed text
		 */
		self.replaceMentionsWithPlainText = function (text) {
			return (text || '').replace(self.mentionRegex, '@$1');
		};


		/**
		 * Put service request filter object into the localStorage
		 */
		self.saveServiceRequestFilterToLocalStorage = function () {
			//localStorageService.set(self.SERVICE_REQUESTS_FILTER_LOCAL_STORAGE_KEY, self.serviceRequestFilter.filterByStatus);
		};


		/**
		 * Get service request filter object from the localStorage
		 * @returns {*} filterStatuses service request filter object
		 */
		self.getServiceRequestFilterFromLocalStorage = function () {
		//	return localStorageService.get(self.SERVICE_REQUESTS_FILTER_LOCAL_STORAGE_KEY);
		};


		/**
		 * Remove service request filter object from the localStorage
		 */
		self.removeServiceRequestFilterFromLocalStorage = function () {
			//localStorageService.remove(self.SERVICE_REQUESTS_FILTER_LOCAL_STORAGE_KEY);
		};


		/**
		 * Insert <code>activityItem</code> into <code>cachedStream</code>. If item was previously in cache,
		 * it will be updated
		 * @param {Object} activityItem Activity item that was returned from server
		 * @param {Object} cachedStream Cached activity stream (either <code>self.cache</code> or <code>self.notificationsCache</code>)
		 * @returns {Array} List of parent streams (timelines) for previous version of the item
		 */
		function insertActivityItemIntoCache(activityItem, cachedStream) {

			/**
			 * Inner function that does the actual inserting
			 * It is separated for re-use
			 */
			function insert(stream, item) {
				// optional cache initialization
				if (!stream.items) { stream.items = []; }
				if (!stream.itemsById) { stream.itemsById = {}; }
				// if item is already in cache (e.g. it's modifiedDate was updated since last loading)...
				var existingItemIndex = stream.items.indexOf(_.findWhere(stream.items, { id: item.id }));
				if (existingItemIndex !== -1) {
					// ...remove it from array
					stream.items.splice(existingItemIndex, 1);
				}

				stream.items.push(item);
				stream.itemsById[item.id] = item;
			}


			var existingParentStreams;
			if (self.allItemsById[activityItem.id]) {
				// if item already existed previously, extract its parent streams
				existingParentStreams = self.allItemsById[activityItem.id].parentStreams;
			}

			// for each parent stream of item's previous version, insert current version of activity item
			_.each(existingParentStreams, function (parentStream) {
				if (parentStream !== cachedStream) {
					insert(parentStream, activityItem);
				}
			});

			insert(cachedStream, activityItem);

			return existingParentStreams;
		}


		/**
		 * Perform sorting by modifiedDate, and update options for timeline-styled displays
		 * @param cachedStream Cached object of the activity stream
		 */
		function sortCachedStream(cachedStream) {
			// sort items by date
			var splitLocaleFormat = userModel.dateTimeFormat.split(" ");
			var localeFormat = userModel.dateTimeFormat;
			if(splitLocaleFormat.length == 2){
				localeFormat = splitLocaleFormat[0].toUpperCase() + " " + splitLocaleFormat[1];
			}else if(splitLocaleFormat.length > 2){
				localeFormat = splitLocaleFormat[0].toUpperCase() + " " + splitLocaleFormat[1] + " " + splitLocaleFormat[2];
			}
			cachedStream.items.sort(function (item1, item2) {
				return moment(item2.createDate,localeFormat) - moment(item1.createDate,localeFormat);
			});


			self.setTimelineOptions(cachedStream.items,true);
		}


		/**
		 * Activity stream cache helper
		 *  - eliminates double calls for same object's activity stream
		 *  - prepares request params taking cache timestamp into account
		 *  - uses default processing for returned activity items
		 *  - adds returned items to cachedStream.items and cachedStream.itemsById
		 * @param makeRequest Function makes server calls and writes loading promise to cachedStream.loadingPromise
		 * @param requestParams Object with request query params
		 * @param cachedStream Cache object
		 * @param [options] Object with options:
		 * - loadMorePastItems: If true, item that are older that previously loaded are requested
		 * - typeFilter: type filter for activity items
		 * - preProcessResponse: function to perform pre-processing of the server response
		 * - forceServerCall: If true, cached loading promise will not be used,
		 * 					  and activity stream data will be loaded from server in any case
		 * @returns {*} Promise that will be resolved with updated cache object
		 */
		function activityStreamWithCache(makeRequest, requestParams, cachedStream, options) {
			options = options || {};

			// typeFilter fallback
			options.typeFilter = options.typeFilter || '';
			if(typeof options.searchStr == 'undefined')
				options.searchStr = '';
			// cache initialization
			if (!cachedStream.items) { cachedStream.items = []; }
			if (!cachedStream.itemsById) { cachedStream.itemsById = {}; }
			if (!cachedStream.newestItemDatesByType) { cachedStream.newestItemDatesByType = {}; }
			if (!cachedStream.oldestItemDatesByType) { cachedStream.oldestItemDatesByType = {}; }

			// If stream is loading and corresponding promise is present, then return loading promise to eliminate double calls.
			// Do not return loading promise in case when server call needs to be forced.
			if (cachedStream.isLoading && cachedStream.loadingPromise && !options.forceServerCall) {
				return cachedStream.loadingPromise;
			}

			if (options.loadMorePastItems || !cachedStream.newestItemDatesByType[options.typeFilter]) {
				// items from the past need to be loaded (by request, or by default)

				// if oldest item timestamp is present...
				if (options.loadMorePastItems && cachedStream.oldestItemDatesByType[options.typeFilter]) {
					// ...server will be queried for items older than that timestamp
					requestParams.criteria = '[less_than,createDate,' + cachedStream.oldestItemDatesByType[options.typeFilter] + ']';
				}

				requestParams.top = 30;
			} else {
				// newer items need to be requested, server will be queried for items newer than timestamp
				requestParams.criteria = '[greater_than,createDate,' + cachedStream.newestItemDatesByType[options.typeFilter] + ']';
			}

			// loading flag
			cachedStream.isLoading = true;

			// this function should modify cachedStream.loadingPromise
			makeRequest();

			cachedStream.loadingPromise = cachedStream.loadingPromise
				// a pre-processing function will be called if defined, otherwise the result is passed further as-is
				.then(options.preProcessResponse || function (result) {
					return $q.when(result); })
				.then(processActivityStreamDataResponse) // default processing, should return array of returned activity items
				.then(function (items) {
					/** Flag to indicate if notificationsCache needs sorting, in case when notifications were returned among regular activity items */
					var notificationsUpdated = false;

					for (var i = 0, l = items.length; i < l; i++) {
						// insert item into cache
						var existingParentStreams = insertActivityItemIntoCache(items[i], cachedStream);

						// if regular cache (for non-notification) is used, and current item is notification...
						if (cachedStream != self.notificationsCache && items[i].isNotification) {
							if (!self.notificationsCache) { self.notificationsCache = {}; }
							// ...insert item into notifications cache
							insertActivityItemIntoCache(items[i], self.notificationsCache);
							notificationsUpdated = true;
						}

						self.allItemsById[items[i].id] = items[i];

						/** array of parent streams that contains items and itemsById */
						items[i].parentStreams = existingParentStreams ? existingParentStreams : [];
						// add cachedStream to list of item's parent streams if it's not already there
						if (!_.findWhere(items[i].parentStreams, { id: cachedStream. id })) {
							items[i].parentStreams.push(cachedStream);
						}
					}

					// if past items were loaded manually or this is the first load...
					if ((options.loadMorePastItems || !cachedStream.oldestItemDatesByType[options.typeFilter]) && items[items.length - 1]) {
						// ...then remember the date of the oldest item
						cachedStream.oldestItemDatesByType[options.typeFilter] = items[items.length - 1].createDate;
					}

					// if there were no items (or too little to load further from the past, or special end-flag was present)...
					if (!items || (items.hasOwnProperty('eof') ? items.eof : (!items.length || items.length < requestParams.top))) {
						if (options.typeFilter) {
							// ...if type filter is present, disable further loading for that type...
							cachedStream.allowMorePastItemsByType[options.typeFilter] = false;
						} else if (options.loadMorePastItems) {
							// ...if there is no filter, but items were loading from the past, disable further loading from the past completely
							cachedStream.allowMorePastItems = false;
						}
					} else if (options.typeFilter) {
						// ...in other case, enable further loading, if type filter is present
						cachedStream.allowMorePastItemsByType[options.typeFilter] = true;
					}

					// if newer items were loaded, remember the date of the newest item
					if ((!options.loadMorePastItems || !cachedStream.newestItemDatesByType[options.typeFilter]) && items[0]) {
						cachedStream.newestItemDatesByType[options.typeFilter] = items[0].createDate;
					}

					// sort items
					sortCachedStream(cachedStream); 

					if (notificationsUpdated) {
						// sort notification items
						sortCachedStream(self.notificationsCache);
					}

					return cachedStream;
				})
				.finally(function () {
					cachedStream.isLoading = false;
				});

			return cachedStream.loadingPromise;
		}


		/**
		 * Returns array of processed activity items
		 * @param result Server response
		 * @returns {Array} Processed activity items
		 */
		function processActivityStreamDataResponse(result) {
			var returnedItems = [];

			// Return an empty array if the result from server is not valid
			if (!result || !result[0]) {
				return [];
			}

			var removedItemsIds = result[1] ? result[1].removedItemsIds : [];
			// Indicates whether there are any activity items that have been removed from the RemedyForce
			var hasRemovedItems = angular.isArray(removedItemsIds) && removedItemsIds.length > 0;

			if (hasRemovedItems) {
				// Clear cache for removed activity items
				_.each(removedItemsIds, function (id) {
					if (self.allItemsById[id]) {
						self.removeActivityItemFromCache(self.allItemsById[id]);
					}
				});
			}

			if (angular.isArray(result[0].items)) {
				for (var i = 0, l = result[0].items.length; i < l; i++) {
					if (hasRemovedItems && _.contains(removedItemsIds, result[0].items[i].id)) {
						// Do not process activity items that were removed
						continue;
					}
					processActivityItem(result[0].items[i]);
					returnedItems.push(result[0].items[i]);
				}
				// copy 'end-of-stream' flag, if it's present
				if (result[0].hasOwnProperty('eof')) {
					returnedItems.eof = result[0].eof
				}
			}
			return returnedItems;
		}


		/**
		 * Process activity stream item returned from server:
		 * - parse JSON in selected item fields
		 * - set notification and sticky flags
		 * - set mentions flags to be used in activity stream filter
		 * - parse attachments
		 * - add user thumbnail and commenters' thumbnails to cache
		 *
		 * @param {Object} item Activity stream item
		 */
		function processActivityItem(item) {
			var textItemTypes = ['microblog', 'cloud_microblog', 'checkin', 'checkout', 'reservation'];
			
			item.feedData = angular.fromJson(item.feedData);
			item.onBehalf = angular.fromJson(item.onBehalf);

			item.isSticky = item.disposition === 'sticky';
			item.isNotification = item.isSticky || item.disposition === 'notification' || item.disposition === 'read';

			if (_.contains(textItemTypes, item.feedObjectType)) {
				item.showAsMicroblog = true;
			}

			if (item.referencedBy) {
				item.referencedBy = angular.fromJson(item.referencedBy);
				processAttachmentsMetadata(item.referencedBy);
			}

			if (item.feedObjectType !== 'appointment' 
				&& item.feedData.location && item.feedData.location !== 'UNKNOWN') {
				getMicroblogLocation(item, item.feedData.location);
			}

			if (item.feedObjectType === 'request') {
				//item.isRequest = true;
			}

			if (item.feedObjectType === 'appointment') {
				/*item.appointmentLocation = appointmentService.processLocation({
					locationId: item.feedData.location,
					locationName: item.feedData.locationName,
					assetId: item.feedData.assetId,
					assetName: item.feedData.assetName
				});
				item.appointmentTime = appointmentService.calculateCalendarTime(item.feedData.time * 1000, item.feedData.timezoneOffset);*/
				if (item.feedData.status) {
					item.feedData.status = item.feedData.status.toLowerCase();
					if (item.feedData.status === 'canceled') {
						item.feedData.status = 'cancelled';
					}
				}
				// mark past appointments that were not cancelled
				if (item.feedData.status !== 'cancelled' && moment() > moment(item.feedData.time * 1000)) {
					item.feedData.status = 'past';
				}
			}

			if (item.feedObjectType === 'approval') {
				item.isApproval = true;
				//approvalService.processApprovals([item.feedData]);
			}

			if (item.feedObjectType === 'cloud_services_request') {
				item.isClmRequest = true;
				item.clmRequestStatus = item.feedData.status;
			}

			processAttachmentsMetadata(item);

			if (!item.comments) {
				item.comments = [];
			}

			if (angular.isArray(item.comments) && item.comments.length) {
				for (var j = 0, l = item.comments.length; j < l; j++) {
					if (item.comments[j].createdByThumbnail) {
						thumbnailCache.put(item.comments[j].createdByType, item.comments[j].createdById, item.comments[j].createdByThumbnail);
					}
				}
			}

			if (item.createdByThumbnail) {
				thumbnailCache.put(item.createdByType, item.createdById, item.createdByThumbnail);
			}

			var matchedMention;
			item.mentions = {};
			while ((matchedMention = self.mentionRegex.exec(item.feedText)) !== null) {
				item.mentions[matchedMention[3]] = true;
			}
		}


		/**
		 * Inserts array of comments into model's activity item with specified ID
		 *
		 * @param {String} activityItemId ID of specified activity item
		 * @param data Server response
		 */
		function processActivityItemComments(activityItemId, data) {
			var activityItem = self.allItemsById[activityItemId];
			// comments array is re-initialized because posting or getting comments returns full list of comments for item
			activityItem.comments = [];
			if (data && data[0] && data[0].items && data[0].items.length) {
				for (var i = 0, l = data[0].items.length; i < l; i++) {
					activityItem.comments.push(data[0].items[i]);
				}
			}
		}


		/**
		 * Send request for location details and extend activityItem with them
		 * @param activityItem Activity item (microblog post)
		 * @param locationId ID of location
		 */
		function getMicroblogLocation(activityItem, locationId) {
			activityItem.locationIsLoading = true;

			if (!self.locationCache) { self.locationCache = {}; }
			if (!self.locationPromises) { self.locationPromises = {}; }

			var promise;

			if (self.locationCache[locationId]) {
				promise = $q.when(self.locationCache[locationId]);
			} else if (self.locationPromises[locationId]) {
				promise = self.locationPromises[locationId];
			} else {
				/*self.locationPromises[locationId] = locationModel.getLocationById(locationId)
					.then(function (response) {
						if (response && response[0] && response[0].items && response[0].items[0]) {
							self.locationCache[locationId] = response[0].items[0];
							return response[0].items[0];
						} else {
							return {};
						}
					});

				promise = self.locationPromises[locationId];*/
			}

			promise
				.then(function (location) {
					if (!_.isEmpty(location)) {
						activityItem.location = location;
					}
				})
				.finally(function () {
					activityItem.locationIsLoading = false;
				})
		}


		/**
		 * Normalize <code>attachmentMetadata</code>, set thumbnail and download URL for each item
		 * @param activityItem Social activity item object with <code>attachmentMetadata</code>
		 */
		function processAttachmentsMetadata(activityItem) {
			if (!activityItem.attachmentMetadata) { return; }

			if (typeof activityItem.attachmentMetadata === "string") {
				activityItem.attachments = angular.fromJson(activityItem.attachmentMetadata);
			} else if (typeof activityItem.attachmentMetadata === "object" && _.isArray(activityItem.attachmentMetadata)) {
				activityItem.attachments = activityItem.attachmentMetadata;
			} else {
				activityItem.attachments = [];
			}

			activityItem.hasAttachments = activityItem.attachments.length > 0;

			for (var i = 0, attachment, length = activityItem.attachments.length; i < length; i++) {
				attachment = activityItem.attachments[i];
				attachment.downloadUrl = angular.restPrefix + 'rest/v2/attachment/content/' + encodeURIComponent(attachment.ownerType) + '/' + encodeURIComponent(attachment.ownerId) + '/' + attachment.key;

				if (!attachment.thumbnail) {
					//attachment.type = attachmentService.recognizeFileType(attachment.contentType, attachment.filename);
				} else {
					//attachment.thumbnail = attachmentService.normalizeDataUrlString(attachment.thumbnail, attachment.thumbnailMime);
				}
			}
		}

		// When user logs out...
		$rootScope.$on('myit.user.logout', function (event, data) {
			if (data && data.userId) {
				// ...clear cache for that user
				self.clearCacheForElement('user', data.userId);
				// remove SRs filter from the local storage
				self.removeServiceRequestFilterFromLocalStorage();
				initServiceRequestFilter();
			}
		});
		
		return self;

	}
