let ARRAY_SIZE = 15
let position = 0
let i = 0
let key
let sorted = false
let list = new Array()
let bucket = new Array()

initializeList()
initializeBuckets()

function reset() {
  sorted = false
  initializeList()
  clearBuckets()
  i = 0
  position = 0
  initializeList()
  draw()
}

function initializeList() {
  for (let i = 0; i < ARRAY_SIZE; i++) {
    list[i] = Math.floor(Math.random() * 1000)
  }
}

let dataWebsiteViewsChart = {
  labels: list,
  series: [list]
}

/** Create array list for each bucket */
function initializeBuckets() {
  for (let i = 0; i < 10; i++) {
    bucket[i] = new Array()
  }
}

/** Clear the buckets */
function clearBuckets() {
  for (let i = 0; i < 10; i++) {
    bucket[i].splice(0, bucket[i].length)
  }
}

function draw() {
  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')
  // Reset size will clear the canvas, but not for IE9
  canvas.width = window.innerWidth - 20
  canvas.height = window.innerHeight - 180
  context.clearRect(0, 0, canvas.width, canvas.height) // For IE 9

  context.font = '14px sans-serif'
  context.strokeStyle = '#100' // Set a pen color

  drawList(context, list, -70, 0, '')
  drawBuckets(context, -119, 50, bucket)

  if (sorted) {
    md.showNotification('top', 'center')
  }
  context.stroke()

  md.initDashboardPageCharts()
}

function drawList(context, list, startX, startY, title) {
  context.fillText(title, 40 * (0 + 1) + startX - 5, 60 + startY)
  for (let k = 0; k < list.length; k++) {
    if (i - 1 == k) {
      context.fillStyle = '#EB0D1B'
      context.fillText(list[k] + '', 40 * (k + 2) + 5 + startX, 60 + startY)
      context.fillStyle = 'black'
    }
    context.fillText(list[k] + '', 40 * (k + 2) + 5 + startX, 60 + startY)
    context.rect(40 * (k + 2) + startX, 40 + startY, 40, 30)
  }
}

function drawBuckets(context, startX, startY, bucket) {
  let paras = document.getElementsByClassName('numbers')
  console.log(paras[0])
  while (paras[0] !== undefined) {
    paras[0].remove()
  }
  // if (paras) {
  //   // while (paras[0]) {
  //   //   console.log
  //   // }

  // }
  for (let i = 0; i < 10; i++) {
    context.rect(65 * (i + 2) + startX, 40 + startY, 50, 150)
    context.fillText(
      'Balde ' + i + ' ',
      65 * (i + 2) + startX - 5,
      210 + startY
    )

    let bucket_name = 'balde_' + i
    let bucket_node = document.getElementById(bucket_name)

    for (let j = 0; j < bucket[i].length; j++) {
      context.fillText(
        bucket[i][j],
        65 * (i + 2) + startX + 15,
        j * 20 + 60 + startY
      )

      let h2_node = document.createElement('H2')
      h2_node.classList.add('card-title')
      h2_node.classList.add('numbers')
      // adicionar o valor ao elemento
      let textnode = document.createTextNode(bucket[i][j])
      // adicionar o elemento ao h2
      h2_node.appendChild(textnode)
      // adicionar o valor ao balde
      bucket_node.appendChild(h2_node)
    }

    if (i == key && bucket[i].length > 0) {
      // let bucket_name = 'balde_' + i
      // let bucket_node = document.getElementById(bucket_name)
      context.fillStyle = '#EB0D1B'
      context.fillText(
        bucket[i][bucket[i].length - 1],
        65 * (i + 2) + startX + 15,
        (bucket[i].length - 1) * 20 + 60 + startY
      )
      context.fillStyle = 'black'
    }

    /*<div class="col-xl-2 col-lg-2 col-md-6 col-sm-6">
          <div class="card card-stats" style="text-align: center; margin-top: 1em" id="balde_1">
            <div class="card-header card-header-warning">
              <h3 class="card-title">Balde 1</h3>
            </div>
              <h2 class="card-title">49/50</h2>
              <h2 class="card-title">49/50</h2>
          </div>
      </div>
    

    // cria o id do balde = id do elemento
    let bucket_name = "balde_"+i
    // busco o balde
    let bucket_node = document.getElementById(bucket_name)
    // crio um elemento h2 => onde vai colocar o valor
    let h2_node = document.createElement("H2");
    // adicionar o estilo do elemento
    h2_node.classList.add("card-title");
    // adicionar o valor ao elemento
    let textnode = document.createTextNode("21")
    // adicionar o elemento ao h2
    h2_node.appendChild(textnode)
    // adicionar o valor ao balde
    bucket_node.appendChild(h2_node)
    */
  }
  // clearBuckets()
}

let count = 0

function step() {
  if (takeAStep()) {
    sorted = true
  }
  draw()
  count++
}

function takeAStep() {
  // Distribute the elements from list to buckets
  if (i < list.length) {
    key = getKey(list[i], position)
    bucket[key][bucket[key].length] = list[i]
    i++
    return false
  } else if (position < 2) {
    bucketsToList()
    clearBuckets()
    clearHtmlBuckets()
    i = 0
    position++
    return false
  } else {
    bucketsToList()
    clearBuckets()
    return true
  }
}

function clearHtmlBuckets() {}

/** move the elements from the buckets back to list */
function bucketsToList() {
  let k = 0 // k is an index for list
  for (let i = 0; i < bucket.length; i++) {
    for (let j = 0; j < bucket[i].length; j++) list[k++] = bucket[i][j]
  }
}

/** Return the digit at the specified position.
 * The last digit's position is 0. */
function getKey(number, position) {
  let result = 1
  for (let i = 0; i < position; i++) result *= 10

  return Math.floor(number / result) % 10
}

//##########################################################################################################
/*!

    =========================================================
    * Material Dashboard Dark Edition - v2.1.0
    =========================================================

    * Product Page: https://www.creative-tim.com/product/material-dashboard-dark
    * Copyright 2019 Creative Tim (http://www.creative-tim.com)

    * Coded by www.creative-tim.com

    =========================================================

    * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    */

;(function() {
  isWindows = navigator.platform.indexOf('Win') > -1 ? true : false

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar()

    $('html').addClass('perfect-scrollbar-on')
  } else {
    $('html').addClass('perfect-scrollbar-off')
  }
})()

// let breakCards = true

// let searchVisible = 0
// let transparent = true

// let transparentDemo = true
// let fixedTop = false

// let mobile_menu_visible = 0,
//   mobile_menu_initialized = false,
//   toggle_initialized = false,
//   bootstrap_nav_initialized = false

// let seq = 0,
//   delays = 80,
//   durations = 500
// let seq2 = 0,
//   delays2 = 80,
//   durations2 = 500

$(document).ready(function() {
  $('body').bootstrapMaterialDesign()

  $sidebar = $('.sidebar')

  md.initSidebarsCheck()

  window_width = $(window).width()

  // check if there is an image set for the sidebar's background
  md.checkSidebarImage()

  //    Activate bootstrap-select
  if ($('.selectpicker').length != 0) {
    $('.selectpicker').selectpicker()
  }

  //  Activate the tooltips
  $('[rel="tooltip"]').tooltip()

  $('.form-control')
    .on('focus', function() {
      $(this)
        .parent('.input-group')
        .addClass('input-group-focus')
    })
    .on('blur', function() {
      $(this)
        .parent('.input-group')
        .removeClass('input-group-focus')
    })

  // remove class has-error for checkbox validation
  $(
    'input[type="checkbox"][required="true"], input[type="radio"][required="true"]'
  ).on('click', function() {
    if ($(this).hasClass('error')) {
      $(this)
        .closest('div')
        .removeClass('has-error')
    }
  })
})

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this)

  if (mobile_menu_visible == 1) {
    $('html').removeClass('nav-open')

    $('.close-layer').remove()
    setTimeout(function() {
      $toggle.removeClass('toggled')
    }, 400)

    mobile_menu_visible = 0
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled')
    }, 430)

    let $layer = $('<div class="close-layer"></div>')

    if ($('body').find('.main-panel').length != 0) {
      $layer.appendTo('.main-panel')
    } else if ($('body').hasClass('off-canvas-sidebar')) {
      $layer.appendTo('.wrapper-full-page')
    }

    setTimeout(function() {
      $layer.addClass('visible')
    }, 100)

    $layer.click(function() {
      $('html').removeClass('nav-open')
      mobile_menu_visible = 0

      $layer.removeClass('visible')

      setTimeout(function() {
        $layer.remove()
        $toggle.removeClass('toggled')
      }, 400)
    })

    $('html').addClass('nav-open')
    mobile_menu_visible = 1
  }
})

// activate collapse right menu when the windows is resized
$(window).resize(function() {
  md.initSidebarsCheck()

  // reset the seq for charts drawing animations
  seq = seq2 = 0

  setTimeout(function() {
    md.initDashboardPageCharts()
  }, 500)
})

md = {
  misc: {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0
  },

  checkSidebarImage: function() {
    $sidebar = $('.sidebar')
    image_src = $sidebar.data('image')

    if (image_src !== undefined) {
      sidebar_container =
        '<div class="sidebar-background" style="background-image: url(' +
        image_src +
        ') "/>'
      $sidebar.append(sidebar_container)
    }
  },

  initSidebarsCheck: function() {
    if ($(window).width() <= 991) {
      if ($sidebar.length != 0) {
        md.initRightMenu()
      }
    }
  },

  initDashboardPageCharts: function() {
    if (
      $('#dailySalesChart').length != 0 ||
      $('#completedTasksChart').length != 0 ||
      $('#websiteViewsChart').length != 0
    ) {
      /* ----------==========     Daily Sales Chart initialization    ==========---------- */

      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [[12, 17, 7, 17, 23, 18, 38]]
      }

      optionsDailySalesChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      let dailySalesChart = new Chartist.Line(
        '#dailySalesChart',
        dataDailySalesChart,
        optionsDailySalesChart
      )

      md.startAnimationForLineChart(dailySalesChart)

      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      dataCompletedTasksChart = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [[230, 750, 450, 300, 280, 240, 200, 190]]
      }

      optionsCompletedTasksChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      let completedTasksChart = new Chartist.Line(
        '#completedTasksChart',
        dataCompletedTasksChart,
        optionsCompletedTasksChart
      )

      // start animation for the Completed Tasks Chart - Line Chart
      md.startAnimationForLineChart(completedTasksChart)

      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      let optionsWebsiteViewsChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      }
      let responsiveOptions = [
        [
          'screen and (max-width: 640px)',
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function(value) {
                return value[0]
              }
            }
          }
        ]
      ]
      let websiteViewsChart = Chartist.Bar(
        '#websiteViewsChart',
        dataWebsiteViewsChart,
        optionsWebsiteViewsChart,
        responsiveOptions
      )

      //start animation for the Emails Subscription Chart
      md.startAnimationForBarChart(websiteViewsChart)
    }
  },

  showNotification: function(from, align) {
    type = ['success', 'primary']

    color = Math.floor(Math.random() * 5 + 1)

    $.notify(
      {
        icon: 'add_alert',
        message:
          '<b>Lista Ordenada</b> - clique no botão <b>reiniciar</b> para gerar uma nova lista.'
      },
      {
        type: type[color],
        timer: 3000,
        placement: {
          from: from,
          align: align
        }
      }
    )
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > 260) {
      if (transparent) {
        transparent = false
        $('.navbar-color-on-scroll').removeClass('navbar-transparent')
      }
    } else {
      if (!transparent) {
        transparent = true
        $('.navbar-color-on-scroll').addClass('navbar-transparent')
      }
    }
  }, 17),

  initRightMenu: debounce(function() {
    $sidebar_wrapper = $('.sidebar-wrapper')

    if (!mobile_menu_initialized) {
      console.log('intra')
      $navbar = $('nav')
        .find('.navbar-collapse')
        .children('.navbar-nav')

      mobile_menu_content = ''

      nav_content = $navbar.html()

      nav_content =
        '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>'

      navbar_form =
        $('nav').find('.navbar-form').length != 0
          ? $('nav').find('.navbar-form')[0].outerHTML
          : null

      $sidebar_nav = $sidebar_wrapper.find(' > .nav')

      // insert the navbar form before the sidebar list
      $nav_content = $(nav_content)
      $navbar_form = $(navbar_form)
      $nav_content.insertBefore($sidebar_nav)
      $navbar_form.insertBefore($nav_content)

      $('.sidebar-wrapper .dropdown .dropdown-menu > li > a').click(function(
        event
      ) {
        event.stopPropagation()
      })

      // simulate resize so all the charts/maps will be redrawn
      window.dispatchEvent(new Event('resize'))

      mobile_menu_initialized = true
    } else {
      if ($(window).width() > 991) {
        // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
        $sidebar_wrapper.find('.navbar-form').remove()
        $sidebar_wrapper.find('.nav-mobile-menu').remove()

        mobile_menu_initialized = false
      }
    }
  }, 200),

  startAnimationForLineChart: function(chart) {
    chart.on('draw', function(data) {
      if (
        (data.type === 'line' || data.type === 'area') &&
        window.matchMedia('(min-width: 900px)').matches
      ) {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        })
      } else if (data.type === 'point') {
        seq++
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        })
      }
    })

    seq = 0
  },
  startAnimationForBarChart: function(chart) {
    chart.on('draw', function(data) {
      if (
        data.type === 'bar' &&
        window.matchMedia('(min-width: 900px)').matches
      ) {
        seq2++
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        })
      }
    })

    seq2 = 0
  }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  let timeout
  return function() {
    let context = this,
      args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }, wait)
    if (immediate && !timeout) func.apply(context, args)
  }
}
