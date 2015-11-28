function  ITS_Navigation(tableId , sizeOfShowedElements , headerExist){
					this.tableId = tableId;
					this.headerExist = headerExist;
					this.SIZE_OF_SHOWED_ELEMENT = sizeOfShowedElements;
					this.table;
					this.numOfPaginaionLinks;	
					this.headerOfTable;
					this.contentsOfPagination = [];
					
					this.createNavigation = function(){
						this.init();
						this.createPaginationLinksAndTheirContent();
						this.chooseFirstNavigationLink();
						this.addClickEventForNavigationLinksToShowContent(this.table,this.headerOfTable,this.contentsOfPagination);
					}
					
					this.init = function(){
						this.table = document.getElementById(this.tableId);
						this.numOfPaginaionLinks = ($(this.table).find("tr").length-1) / this.SIZE_OF_SHOWED_ELEMENT;
						if(this.headerExist)
							this.headerOfTable = $(this.table).find("tr")[0].outerHTML;
						else
							this.headerOfTable = "";
					}
					 
					this.createPaginationLinksHolder = function(){
						$(this.table).after('<ul class="pagination" id="pagination'+$(this.table).attr('id')+'"></ul>');
					} 
					 
					this.createPaginationLinksAndTheirContent= function(){
						this.createPaginationLinksHolder();
						var currentPaginationLink;
						for(currentPaginationLink=0; currentPaginationLink<this.numOfPaginaionLinks; currentPaginationLink++){
							if(currentPaginationLink > 4 ){
								$("#pagination"+$(this.table).attr('id')).append('<li><a href="#" id="pagination'+($(this.table).attr('id')+(currentPaginationLink+1))+'" class="paginationLink hide">'+(currentPaginationLink+1)+'</a></li>');
							}else{
								$("#pagination"+$(this.table).attr('id')).append('<li><a href="#" id="pagination'+($(this.table).attr('id')+(currentPaginationLink+1))+'" class="paginationLink show">'+(currentPaginationLink+1)+'</a></li>');
							}
							this.createContentForPaginationLink(currentPaginationLink);
						}
						
						if(currentPaginationLink > 5){
							this.createPreviousAndNextLinks(currentPaginationLink)
						}
					}
					
					this.createPreviousAndNextLinks = function(currentPaginationLink){
						var paginationPrevHtmlContent = "<li class='disabled'><a href='#' aria-label='Previous' id='previousPagination"+$(this.table).attr('id')+"' style='cursor:default;'><span aria-hidden='true'>&#8249;</span></a></li>";
						var paginationNextHtmlContent = '<li><a href="#" aria-label="Next" id="nextPagination'+$(this.table).attr('id')+'"><span aria-hidden="true">&#8250;</span></a></li>';
						
						if(currentPaginationLink > 9){
							paginationPrevHtmlContent = "<li class='disabled'><a href='#' aria-label='PreviousBulk' id='previousBulkPagination"+$(this.table).attr('id')+"' style='cursor:default;'><span aria-hidden='true'>&laquo;</span></a></li>" + paginationPrevHtmlContent;
							paginationNextHtmlContent = paginationNextHtmlContent + '<li><a href="#" aria-label="NextBulk" id="nextBulkPagination'+$(this.table).attr('id')+'"><span aria-hidden="true">&raquo;</span></a></li>';
						}
						$("#pagination"+$(this.table).attr('id')).html(paginationPrevHtmlContent+$("#pagination"+$(this.table).attr('id')).html());
						$("#pagination"+$(this.table).attr('id')).html($("#pagination"+$(this.table).attr('id')).html()+paginationNextHtmlContent);
						
						this.addClickEventForPreviousAndNextButtons(this.table,this.numOfPaginaionLinks);
						
						if(currentPaginationLink > 9){
							this.addClickEventForPreviousAndNextBulkButtons(this.table,this.numOfPaginaionLinks);
						}
					}
					
					this.createContentForPaginationLink= function(currentPaginationLink){
						if(this.headerExist)
							var currentContentRowNumber = (currentPaginationLink*this.SIZE_OF_SHOWED_ELEMENT)+1;
						else
							var currentContentRowNumber = (currentPaginationLink*this.SIZE_OF_SHOWED_ELEMENT);
						for(var count2=0; count2<this.SIZE_OF_SHOWED_ELEMENT && currentContentRowNumber < $(this.table).find("tr").length ; count2++){
							this.contentsOfPagination[currentPaginationLink]+=$(this.table).find("tr")[currentContentRowNumber].outerHTML;
							currentContentRowNumber++;
						}
					}
					
					this.chooseFirstNavigationLink =function (){
						$(this.table).html(this.headerOfTable+this.contentsOfPagination[0]);
						ITS_Navigation.resetNavigationLinks("#pagination"+$(this.table).attr('id'));
						$('#pagination1').parent().addClass('active');
					}
					
					this.addClickEventForPreviousAndNextButtons = function(table,numOfPaginaionLinks){
						
						$("#previousPagination"+$(table).attr('id')).click(function(){
							var allPaginationLinks = $('#pagination'+$(table).attr('id')).find('li');
							var showedPaginationLinks = $('#pagination'+$(table).attr('id')).find('.show');
							var hiddenPaginationLinks = $('#pagination'+$(table).attr('id')).find('.hide');
							
							var firstShowedELementId = parseInt($(showedPaginationLinks[0]).attr('id').replace('pagination'+$(table).attr('id'),''));
							var lastShowedElementId = parseInt($(showedPaginationLinks[showedPaginationLinks.length-1]).attr('id').replace('pagination'+$(table).attr('id'),''));
							
							ITS_Navigation.moveOneLinkBackward(firstShowedELementId, lastShowedElementId , $(table).attr('id'));
							
							ITS_Navigation.checkActivityOfNextLinks(lastShowedElementId-1 ,allPaginationLinks, table);
							ITS_Navigation.checkActivityOfPreviousLinks(firstShowedELementId-1 , table);
						});
						
						$("#nextPagination"+$(table).attr('id')).click(function(){
							
							var allPaginationLinks = $('#pagination'+$(table).attr('id')).find('li');
							var showedPaginationLinks = $('#pagination'+$(table).attr('id')).find('.show');
							var hiddenPaginationLinks = $('#pagination'+$(table).attr('id')).find('.hide');
							
							var firstShowedELementId = parseInt($(showedPaginationLinks[0]).attr('id').replace('pagination'+$(table).attr('id'),''));
							var lastShowedElementId = parseInt($(showedPaginationLinks[showedPaginationLinks.length-1]).attr('id').replace('pagination'+$(table).attr('id'),''));
							
							ITS_Navigation.moveOneLinkForward(firstShowedELementId, lastShowedElementId , $(table).attr('id'));
							
							ITS_Navigation.checkActivityOfNextLinks(lastShowedElementId+1 ,allPaginationLinks, table);
							ITS_Navigation.checkActivityOfPreviousLinks(firstShowedELementId+1 , table);
						});
					}
					
					this.addClickEventForPreviousAndNextBulkButtons =  function(table,numOfPaginaionLinks){
						$("#previousBulkPagination"+$(table).attr('id')).click(function(){
							var allPaginationLinks = $('#pagination'+$(table).attr('id')).find('li');
							var showedPaginationLinks = $('#pagination'+$(table).attr('id')).find('.show');
							var hiddenPaginationLinks = $('#pagination'+$(table).attr('id')).find('.hide');
							
							var firstShowedELementId = parseInt($(showedPaginationLinks[0]).attr('id').replace('pagination'+$(table).attr('id'),''));
							var lastShowedElementId = parseInt($(showedPaginationLinks[showedPaginationLinks.length-1]).attr('id').replace('pagination'+$(table).attr('id'),''));
							
							ITS_Navigation.moveFiveLinksBackward(firstShowedELementId,lastShowedElementId , $(table).attr('id'));
							
							
							ITS_Navigation.checkActivityOfNextLinks(lastShowedElementId-5 ,allPaginationLinks, table);
							ITS_Navigation.checkActivityOfPreviousLinks(firstShowedELementId-5 , table);
							
						});
						
						$("#nextBulkPagination"+$(table).attr('id')).click(function(){
							
							var allPaginationLinks = $('#pagination'+$(table).attr('id')).find('li');
							var showedPaginationLinks = $('#pagination'+$(table).attr('id')).find('.show');
							var hiddenPaginationLinks = $('#pagination'+$(table).attr('id')).find('.hide');
							var firstShowedELementId = parseInt($(showedPaginationLinks[0]).attr('id').replace('pagination'+$(table).attr('id'),''));
							var lastShowedElementId = parseInt($(showedPaginationLinks[showedPaginationLinks.length-1]).attr('id').replace('pagination'+$(table).attr('id'),''));
							
							
							ITS_Navigation.moveFiveLinksForward(firstShowedELementId,lastShowedElementId , $(table).attr('id'));
							
							
							ITS_Navigation.checkActivityOfNextLinks(lastShowedElementId+5 ,allPaginationLinks, table);
							ITS_Navigation.checkActivityOfPreviousLinks(firstShowedELementId+5 , table);
					
						});
					}
					
					
					
					this.addClickEventForNavigationLinksToShowContent =  function (table,headerOfTable,contentsOfPagination){
						$(".paginationLink").click(function(){

							if($(this).attr("id").indexOf($(table).attr('id')) > -1){
								var currentIndex = parseInt($(this).attr("id").replace('pagination'+$(table).attr('id'),''));
							
								ITS_Navigation.resetNavigationLinks("#pagination"+$(table).attr('id'));
								$('#pagination'+$(table).attr('id')+currentIndex).parent().addClass('active');
								$(table).html(headerOfTable+contentsOfPagination[currentIndex-1]);
							}
							
						});
					}
				}
				
				
				ITS_Navigation.checkActivityOfNextLinks= function(lastShowedElementId ,allPaginationLinks, table){
					if(lastShowedElementId < (allPaginationLinks.length-4)){
						$("#nextPagination"+$(table).attr('id')).parent().removeClass('disabled');
						$("#nextPagination"+$(table).attr('id')).css('cursor','auto');
						
						$("#nextBulkPagination"+$(table).attr('id')).parent().removeClass('disabled');
						$("#nextBulkPagination"+$(table).attr('id')).css('cursor','auto');
						
					}else{
						$("#nextPagination"+$(table).attr('id')).parent().addClass('disabled');
						$("#nextPagination"+$(table).attr('id')).css('cursor','default');
						
						$("#nextBulkPagination"+$(table).attr('id')).parent().addClass('disabled');
						$("#nextBulkPagination"+$(table).attr('id')).css('cursor','default');
					}
				}
				
				ITS_Navigation.checkActivityOfPreviousLinks = function(firstShowedELementId, table){
					if(firstShowedELementId > 1){
						$("#previousPagination"+$(table).attr('id')).parent().removeClass('disabled');
						$("#previousPagination"+$(table).attr('id')).css('cursor','auto');
						
						$("#previousBulkPagination"+$(table).attr('id')).parent().removeClass('disabled');
						$("#previousBulkPagination"+$(table).attr('id')).css('cursor','auto');
						
					}else{
						$("#previousPagination"+$(table).attr('id')).parent().addClass('disabled');
						$("#previousPagination"+$(table).attr('id')).css('cursor','default');
						
						$("#previousBulkPagination"+$(table).attr('id')).parent().addClass('disabled');
						$("#previousBulkPagination"+$(table).attr('id')).css('cursor','default');
					}
				}
				
				ITS_Navigation.moveOneLinkBackward = function(firstShowedELementId, lastShowedElementId , tableId){
					if($("#pagination"+tableId+(firstShowedELementId-1)).length > 0){
						$("#pagination"+tableId+(firstShowedELementId-1)).addClass('show');
						$("#pagination"+tableId+(firstShowedELementId-1)).removeClass('hide');
						$("#pagination"+tableId+(lastShowedElementId)).addClass('hide');
						$("#pagination"+tableId+(lastShowedElementId)).removeClass('show');			
					}
				}
				
				ITS_Navigation.moveOneLinkForward = function(firstShowedELementId, lastShowedElementId , tableId){
					if($("#pagination"+tableId+(lastShowedElementId+1)).length > 0){
						$("#pagination"+tableId+firstShowedELementId).addClass('hide');
						$("#pagination"+tableId+firstShowedELementId).removeClass('show');
						$("#pagination"+tableId+(lastShowedElementId+1)).addClass('show');
						$("#pagination"+tableId+(lastShowedElementId+1)).removeClass('hide');			
					}	
				}
				
				ITS_Navigation.moveFiveLinksBackward = function(firstShowedELementId, lastShowedElementId , tableId){
					if($("#pagination"+tableId+(firstShowedELementId-1)).length > 0){
						$("#pagination"+tableId+(firstShowedELementId-1)).addClass('show');
						$("#pagination"+tableId+(firstShowedELementId-1)).removeClass('hide');
						$("#pagination"+tableId+(lastShowedElementId)).addClass('hide');
						$("#pagination"+tableId+(lastShowedElementId)).removeClass('show');
					}
					
					
					if($("#pagination"+tableId+(firstShowedELementId-2)).length > 0){
						$("#pagination"+tableId+(firstShowedELementId-2)).addClass('show');
						$("#pagination"+tableId+(firstShowedELementId-2)).removeClass('hide');
						$("#pagination"+tableId+(lastShowedElementId-1)).addClass('hide');
						$("#pagination"+tableId+(lastShowedElementId-1)).removeClass('show');
					}
					
					if($("#pagination"+tableId+(firstShowedELementId-3)).length > 0){
						$("#pagination"+tableId+(firstShowedELementId-3)).addClass('show');
						$("#pagination"+tableId+(firstShowedELementId-3)).removeClass('hide');
						$("#pagination"+tableId+(lastShowedElementId-2)).addClass('hide');
						$("#pagination"+tableId+(lastShowedElementId-2)).removeClass('show');
					}
					
					
					if($("#pagination"+tableId+(firstShowedELementId-4)).length > 0){
						$("#pagination"+tableId+(firstShowedELementId-4)).addClass('show');
						$("#pagination"+tableId+(firstShowedELementId-4)).removeClass('hide');
						$("#pagination"+tableId+(lastShowedElementId-3)).addClass('hide');
						$("#pagination"+tableId+(lastShowedElementId-3)).removeClass('show');
					}
					
					if($("#pagination"+tableId+(firstShowedELementId-5)).length > 0){
						$("#pagination"+tableId+(firstShowedELementId-5)).addClass('show');
						$("#pagination"+tableId+(firstShowedELementId-5)).removeClass('hide');
						$("#pagination"+tableId+(lastShowedElementId-4)).addClass('hide');
						$("#pagination"+tableId+(lastShowedElementId-4)).removeClass('show');
					}
				}
				
				ITS_Navigation.moveFiveLinksForward = function(firstShowedELementId, lastShowedElementId , tableId){
					if($("#pagination"+tableId+(lastShowedElementId+1)).length > 0){
						$("#pagination"+tableId+firstShowedELementId).addClass('hide');
						$("#pagination"+tableId+firstShowedELementId).removeClass('show');
						$("#pagination"+tableId+(lastShowedElementId+1)).addClass('show');
						$("#pagination"+tableId+(lastShowedElementId+1)).removeClass('hide');
					}								
					
					if($("#pagination"+tableId+(lastShowedElementId+2)).length > 0 ){
						$("#pagination"+tableId+(firstShowedELementId+1)).addClass('hide');
						$("#pagination"+tableId+(firstShowedELementId+1)).removeClass('show');
						$("#pagination"+tableId+(lastShowedElementId+2)).addClass('show');
						$("#pagination"+tableId+(lastShowedElementId+2)).removeClass('hide');
					}	
					
					if($("#pagination"+tableId+(lastShowedElementId+3)).length > 0){
						$("#pagination"+tableId+(firstShowedELementId+2)).addClass('hide');
						$("#pagination"+tableId+(firstShowedELementId+2)).removeClass('show');
						$("#pagination"+tableId+(lastShowedElementId+3)).addClass('show');
						$("#pagination"+tableId+(lastShowedElementId+3)).removeClass('hide');
					}								
					
					if($("#pagination"+tableId+(lastShowedElementId+4)).length > 0 ){
						$("#pagination"+tableId+(firstShowedELementId+3)).addClass('hide');
						$("#pagination"+tableId+(firstShowedELementId+3)).removeClass('show');
						$("#pagination"+tableId+(lastShowedElementId+4)).addClass('show');
						$("#pagination"+tableId+(lastShowedElementId+4)).removeClass('hide');
					}	
					
					if($("#pagination"+tableId+(lastShowedElementId+5)).length > 0 ){
						$("#pagination"+tableId+(firstShowedELementId+4)).addClass('hide');
						$("#pagination"+tableId+(firstShowedELementId+4)).removeClass('show');
						$("#pagination"+tableId+(lastShowedElementId+5)).addClass('show');
						$("#pagination"+tableId+(lastShowedElementId+5)).removeClass('hide');
					}	
				}
					
				ITS_Navigation.resetNavigationLinks = function (navigationId) {
					$(navigationId).find(".paginationLink").parent().removeClass('active');
				};