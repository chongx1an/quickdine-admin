import React, { Component, lazy, Suspense, useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import ApiClient from '../../ApiClient';

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    // custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    // custom: CustomTooltips
  },
  title: {
    display: false,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          display: false,
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    // custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    // custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New customers',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring customers',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Number of orders',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Total sales',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

export default props => {

  const [isOpenCard1, setIsOpenCard1] = useState(false);
  const [isOpenCard2, setIsOpenCard2] = useState(false);
  const [isOpenCard3, setIsOpenCard3] = useState(false);
  const [isOpenCard4, setIsOpenCard4] = useState(false);

  // Order
  const [totalOrderCount, setTotalOrderCount] = useState(1);
  const [orderCounts, setOrderCounts] = useState([]);
  const [unpaidOrderCount, setUnpaidOrderCount] = useState(0);
  const [paidOrderCount, setPaidOrderCount] = useState(0);

  // Product
  const [totalProductCount, setTotalProductCount] = useState(1);

  // Collection
  const [collection1, setCollection1] = useState(null);
  const [collection2, setCollection2] = useState(null);
  const [collection3, setCollection3] = useState(null);
  const [collection4, setCollection4] = useState(null);

  // Sales
  const [totalSales, setTotalSales] = useState(0);
  const [sales, setSales] = useState(0);

  // Tables
  const [totalTableCount, setTotalTableCount] = useState(1);
  const [occupiedTableCount, setOccupiedTableCount] = useState(0);
  const [availableTableCount, setAvailableTableCount] = useState(0);

  // Customer
  const [totalCustomerCount, setTotalCustomerCountt] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [customerSignUpCounts, setCustomerSignUpCounts] = useState([]);
  const [recurringCustomerCounts, setRecurringCustomerCounts] = useState([]);

  const [weekDays, setWeekDays] = useState([]);

  const makeSparkLineChart = (data, label, color) => {

    const chartData = {
      labels: weekDays,
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: color ? color : '#c2cfd6',
          data: data,
          label: label,
        },
      ],
    };
    return () => chartData;
  };


  useEffect(() => {
    calculateWeekdays();
    getOrderAnalytics();
    getProductAndCollectionAnalytics();
    getSalesAnalytics();
    getTableAnalytics();
    getCustomerAnalytics();
  }, []);

  const calculateWeekdays = () => {
    var days = []

    var curr = new Date; // get current date
    var first = curr.getDate() + 1;

    for (var i = 0; i < 7; i++) {
      var next = new Date(curr.getTime());
      next.setDate(first + i);
      days.push(next.toString().substring(0, 3));
    }

    setWeekDays(days)
  }

  const getOrderAnalytics = () => {

    ApiClient.get('@store/analytics/order')
      .then(res => {

        const { success, order } = res;

        setTotalOrderCount(order.total_order_count)
        setOrderCounts(order.order_counts)
        setUnpaidOrderCount(order.unpaid_order_count)
        setPaidOrderCount(order.paid_order_count)
      })
      .catch(console.log);

  }

  const getProductAndCollectionAnalytics = () => {

    ApiClient.get('@store/analytics/product_collection')
      .then(res => {

        const { success, product, collections } = res;

        setTotalProductCount(product.total_product_count)
        setCollection1(collections[0] != null ? {
          name: collections[0].name,
          product_count: collections[0].products.length,
          product_percent: (collections[0].products.length.toFixed(2) / product.total_product_count.toFixed(2) * 100).toFixed(2)
        } : null)
        setCollection2(collections[1] != null ? {
          name: collections[1].name,
          product_count: collections[1].products.length,
          product_percent: (collections[1].products.length.toFixed(2) / product.total_product_count.toFixed(2) * 100).toFixed(2)
        } : null)
        setCollection3(collections[2] != null ? {
          name: collections[2].name,
          product_count: collections[2].products.length,
          product_percent: (collections[2].products.length.toFixed(2) / product.total_product_count.toFixed(2) * 100).toFixed(2)
        } : null)
        setCollection4(collections[3] != null ? {
          name: collections[3].name,
          product_count: collections[3].products.length,
          product_percent: (collections[3].products.length.toFixed(2) / product.total_product_count.toFixed(2) * 100).toFixed(2)
        } : null)
      })
      .catch(console.log);

  }

  const getSalesAnalytics = () => {

    ApiClient.get('@store/analytics/sales')
      .then(res => {

        const { success, sales } = res;
        setTotalSales(parseFloat(sales.total_sales))
        setSales(sales.sales)
      })
      .catch(console.log);

  }

  const getTableAnalytics = () => {

    ApiClient.get('@store/analytics/table')
      .then(res => {
        const { success, table } = res;
        setTotalTableCount(table.total_table_count);
        setOccupiedTableCount(table.occupied_table_count);
        setAvailableTableCount(table.available_table_count);
      })
      .catch(console.log);

  }

  const getCustomerAnalytics = () => {

    ApiClient.get('@store/analytics/customer')
      .then(res => {
        const { success, customer } = res;
        setTotalCustomerCountt(customer.total_customer_count)
        setCustomers(customer.customers.map((customer) => {
          var order_amounts = customer.orders.map(o => parseFloat(o.total_price)).reduce((a, b) => a + b, 0);
          customer.order_amounts = order_amounts
          return customer
        }))
        setCustomerSignUpCounts(customer.customer_signup_counts)
        setRecurringCustomerCounts(customer.recurring_customer_counts)
      })
      .catch(console.log);

  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              {/* <ButtonGroup className="float-right">
                <ButtonDropdown id='card1' isOpen={isOpenCard1} toggle={() => { setIsOpenCard1(!isOpenCard1); }}>
                  <DropdownToggle caret className="p-0" color="transparent">
                    <i className="icon-settings"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem disabled>Disabled action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup> */}
              <div className="text-value">{totalOrderCount}</div>
              <div>Total Orders</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <Line data={cardChartData2} options={cardChartOpts2} height={70} />
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-primary">
            <CardBody className="pb-0">
              <div className="text-value">{totalProductCount}</div>
              <div>Total Products</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <Line data={cardChartData1} options={cardChartOpts1} height={70} />
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-warning">
            <CardBody className="pb-0">
              {/* <ButtonGroup className="float-right">
                <Dropdown id='card3' isOpen={isOpenCard3} toggle={() => { setIsOpenCard3(!isOpenCard3); }}>
                  <DropdownToggle caret className="p-0" color="transparent">
                    <i className="icon-settings"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup> */}
              <div className="text-value">RM {totalSales.toFixed(2)}</div>
              <div>Total Sales</div>
            </CardBody>
            <div className="chart-wrapper" style={{ height: '70px' }}>
              <Line data={cardChartData3} options={cardChartOpts3} height={70} />
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-danger">
            <CardBody className="pb-0">
              {/* <ButtonGroup className="float-right">
                <ButtonDropdown id='card4' isOpen={isOpenCard4} toggle={() => { setIsOpenCard4(!isOpenCard4); }}>
                  <DropdownToggle caret className="p-0" color="transparent">
                    <i className="icon-settings"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup> */}
              <div className="text-value">{occupiedTableCount}/{totalTableCount}</div>
              <div>Table Occupied</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardHeader>
              Customers {' & '} Sales
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="6" xl="6">
                  <Row>
                    <Col sm="6">
                      <div className="callout callout-info">
                        <small className="text-muted">Customer signed up today</small>
                        <br />
                        <strong className="h4">{customerSignUpCounts.lastItem}</strong>
                        <div className="chart-wrapper">
                          <Line data={makeSparkLineChart(customerSignUpCounts, "Customer signed up", brandPrimary)} options={sparklineChartOpts} width={100} height={30} />
                        </div>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="callout callout-danger">
                        <small className="text-muted">Recurring customers</small>
                        <br />
                        <strong className="h4">{recurringCustomerCounts.lastItem}</strong>
                        <div className="chart-wrapper">
                          <Line data={makeSparkLineChart(recurringCustomerCounts, "Recurring customer", brandDanger)} options={sparklineChartOpts} width={100} height={30} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <hr className="mt-0" />
                  {
                    customerSignUpCounts != [] &&
                    [6, 5, 4, 3, 2, 1, 0].map((item, index) => (
                      <Col key={index}>
                        <div className="progress-group mb-4">
                          <div className="progress-group-prepend">
                            <span className="progress-group-text">
                              {weekDays[item]}
                            </span>
                          </div>
                          <div className="progress-group-bars">
                            <Progress className="progress-xs" color="info" value={customerSignUpCounts[item]} />
                            <Progress className="progress-xs" color="danger" value={recurringCustomerCounts[item]} />
                          </div>
                        </div>
                      </Col>

                    ))
                  }
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><Badge pill color="info">&nbsp;</Badge></sup>
                      New customers
                      &nbsp;
                      <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
                      Recurring customers
                    </small>
                  </div>
                </Col>
                <Col xs="12" md="6" xl="6">
                  <Row>
                    <Col sm="6">
                      <div className="callout callout-warning">
                        <small className="text-muted">Today orders</small>
                        <br />
                        <strong className="h4">{orderCounts.lastItem}</strong>
                        <div className="chart-wrapper">
                          <Line data={makeSparkLineChart(orderCounts, 'Order', brandWarning)} options={sparklineChartOpts} width={100} height={30} />
                        </div>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="callout callout-success">
                        <small className="text-muted">Today sales</small>
                        <br />
                        <strong className="h4">RM {parseFloat(sales.lastItem != null ? sales.lastItem : "0").toFixed(2)}</strong>
                        <div className="chart-wrapper">
                          <Line data={makeSparkLineChart(sales, 'Sales', brandSuccess)} options={sparklineChartOpts} width={100} height={30} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <hr className="mt-0" />
                  <ul>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <i className="cil-meh progress-group-icon"></i>
                        <span className="title">Unpaid</span>
                        <span className="ml-auto font-weight-bold">{(unpaidOrderCount / totalOrderCount.toFixed(2) * 100).toFixed(2)}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="warning" value={(unpaidOrderCount / totalOrderCount.toFixed(2) * 100).toFixed(2)} />
                      </div>
                    </div>
                    <div className="progress-group mb-5">
                      <div className="progress-group-header">
                        <i className="cil-mood-good progress-group-icon"></i>
                        <span className="title">Paid</span>
                        <span className="ml-auto font-weight-bold">{(paidOrderCount / totalOrderCount.toFixed(2) * 100).toFixed(2)}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="warning" value={(paidOrderCount / totalOrderCount.toFixed(2) * 100).toFixed(2)} />
                      </div>
                    </div>
                    {
                      collection1 &&
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="cil-fastfood progress-group-icon"></i>
                          <span className="title">Collection {collection1.name}</span>
                          <span className="ml-auto font-weight-bold">{collection1.product_count} product(s)<span className="text-muted small"> ({collection1.product_percent}%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value={collection1.product_percent} />
                        </div>
                      </div>
                    }
                    {
                      collection2 &&
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="cil-fastfood progress-group-icon"></i>
                          <span className="title">Collection {collection2.name}</span>
                          <span className="ml-auto font-weight-bold">{collection2.product_count} product(s)<span className="text-muted small"> ({collection2.product_percent}%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value={collection2.product_percent} />
                        </div>
                      </div>
                    }
                    {
                      collection3 &&
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="cil-fastfood progress-group-icon"></i>
                          <span className="title">Collection {collection3.name}</span>
                          <span className="ml-auto font-weight-bold">{collection3.product_count} product(s)<span className="text-muted small"> ({collection3.product_percent}%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value={collection3.product_percent} />
                        </div>
                      </div>
                    }
                    {
                      collection4 &&
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="cil-fastfood progress-group-icon"></i>
                          <span className="title">Collection {collection4.name}</span>
                          <span className="ml-auto font-weight-bold">{collection4.product_count} product(s)<span className="text-muted small"> ({collection4.product_percent}%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value={collection4.product_percent} />
                        </div>
                      </div>
                    }
                    <div className="divider text-center">
                      <Button color="link" size="sm" className="text-muted" data-toggle="tooltip" data-placement="top"
                        title="" data-original-title="show more"><i className="icon-options"></i></Button>
                    </div>
                  </ul>
                </Col>
              </Row>
              <br />
              <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><i className="icon-people"></i></th>
                    <th>Customers</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Phone number</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    customers.map((customer) => (
                      <tr>
                        <td className="text-center">
                          <div className="avatar">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="img-avatar" alt={`${customer.first_name} ${customer.last_name}`} />
                          </div>
                        </td>
                        <td>
                          <div>{`${customer.first_name} ${customer.last_name}`}</div>
                          <div className="small text-muted">
                            Registered: {new Date(customer.created_at).toDateString()}
                          </div>
                        </td>
                        <td className="text-center">
                          <div>{customer.email}</div>
                        </td>
                        <td className="text-center">
                          <div>{customer.phone}</div>
                        </td>
                        <td>
                          <div className="clearfix">
                            <div className="float-left">
                              <strong>RM {customer.order_amounts}</strong>
                            </div>
                          </div>
                          <Progress className="progress-xs" color="success" value={customer.order_amounts} />
                        </td>
                      </tr>

                    ))
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </div>
  );
}
