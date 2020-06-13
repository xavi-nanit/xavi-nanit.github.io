(function( $ ) {
  
  console.clear()
  console.log('svgColor')
  
  var mainHolder, colorHolder
  var btnRandom, btnClear, btnDownloadSVG, btnDownloadPNG
  var svgObject, svgOutline, svgColor 
  var swatchUp, swatchDown
  var fillSpeed = 0.15
  var chosenColor = '#FFFFFF'
  var colors = ['#FFFFFF', '#8E53A1', '#9bbc88', '#71CCDC', '#F7ED45', '#F7DAAF', '#EC2527', '#F16824', '#CECCCC', '#5A499E', '#06753D', '#024259', '#FDD209', '#7D4829', '#931B1E', '#6600FF', '#979797', '#C296C5', '#54B948', '#3C75BB', '#FF99CC', '#E89D5E', '#F26F68', '#CEAE83', '#676868', '#FF0080', '#169E49', '#3CBEB7', '#CCFF00', '#FFFF99', '#C85A17', '#000000']
  var closeOffset

  function swatchClick(){
    chosenColor = $(this).data('color')
    console.log(chosenColor)
    TweenMax.to(colorHolder, fillSpeed, { backgroundColor:chosenColor })
  }
 // function swatchMove(e){
 //   var moveTo = (e.type == 'mouseenter')? swatchUp: swatchDown;
 //   TweenMax.to('.swatchHolder', 1.5, moveTo);
 // }
  
  function colorMe() {
    TweenMax.to(this, fillSpeed, { fill: chosenColor });
  }
  function colorRollover(e){
    var rollover = (e.type == 'mouseenter')? {scale:1.2}:{scale:1};
    TweenMax.to($(this), 0.05, rollover); 
  }

  function svgRandom() {
    $(svgColor).each(function(){
      var randomNum = Math.floor((Math.random() * colors.length) + 1);
      TweenMax.to(this, fillSpeed, { fill: colors[randomNum] });
    })
  }
  function svgClear() {
    $(svgColor).each(function(){
      TweenMax.to(this, fillSpeed, { fill: "#FFF" });
    })
  }
  function svgDownloadSVG() {
   var svgInfo = $("<div/>").append($(svgObject).clone()).html();
   $(this).attr({
            href:"data:image/svg+xml;utf8,"+svgInfo,
            download:'coloringBook.svg',
            target:"_blank"
    });
  }
  function svgDownloadPNG() {
   // Future expantion:
   // Look at https://bl.ocks.org/biovisualize/8187844
  }

  $.fn.makeSwatches = function() {
    var swatchHolder = $('<ol/>', {'class': 'swatchHolder'}).appendTo(this)
        colorHolder  = $('<li/>', {'class': 'colorHolder', 'text':'Tria el color'}).css('background-color', chosenColor).appendTo(swatchHolder)

    $.each(colors, function() {
      var swatch = $('<li/>').appendTo(swatchHolder)
      $(swatch).css('background-color', this)
      $(swatch).data('color', this)
      $(swatch).on('click', swatchClick)
      $(swatch).on('mouseenter mouseleave', colorRollover)
    })

    var swatchPos = $('.colorHolder').position()
    var swatchHeight = $('.colorHolder').outerHeight(true) + swatchPos.top
    closeOffset = swatchHeight - $('.swatchHolder').outerHeight()

    $('.swatchHolder').on('mouseenter mouseleave', swatchMove)
    $('.swatchHolder').css('bottom',closeOffset)
    swatchUp   = {css:{bottom:0}}
    swatchDown = {css:{bottom:closeOffset}}
  } 
  $.fn.makeSVGcolor = function(svgURL) {
    mainHolder = this
    $( this ).load(svgURL, function() {
      svgObject  = $('svg', this)
      svgColor   = $('g:nth-child(2)', svgObject).children()
      svgOutline = $('g:nth-child(1)', svgObject).children()
      $(svgColor).on('click', colorMe)
      $(mainHolder).makeSwatches()
      $('.swatchHolder').addClass('blue')
    });
  }

  $.fn.btnRandom    = function() {
    btnRandom = this
    $(btnRandom).on('click', svgRandom)
  }
  $.fn.btnClear     = function() {
    btnClear = this
    $(btnClear).on('click', svgClear)
  }
  $.fn.btnDownload  = function(type) {
    if(type == 'PNG'){
      btnDownloadPNG = this
      $(this).on('mouseenter', svgDownloadPNG)
    } else {
      btnDownloadSVG = this
      $(this).on('mouseenter', svgDownloadSVG)
    }
  }
  
  
  

  
}( jQuery ));

$('#ActivityDIV'   ).makeSVGcolor('https://xavi-nanit.github.io/pintar/images/bondia.svg')
$('#btnRandom'     ).btnRandom()
$('#btnClear'      ).btnClear()
$('#btnDownloadSVG').btnDownload()
