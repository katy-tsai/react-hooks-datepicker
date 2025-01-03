'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var dayjs = require('dayjs');
var useDatePicker = require('../hooks/useDatePicker.js');

const DateRangePicker = _ref => {
  let {
    className,
    startTime: startDate,
    endTime: endDate,
    onApply,
    name,
    placeholder,
    maxDate,
    minDate,
    format = "YYYY/MM/DD"
  } = _ref;
  let [inputValue, setInputValue] = React.useState("");
  let {
    setStartTime,
    setEndTime,
    getNextMonthProps,
    getPreMonthProps,
    onOpenCalendar,
    onCloseCalendar,
    isOpen,
    weeks,
    getRangeCalendarDays,
    year,
    month,
    months,
    getDayLabel,
    getDayProps
  } = useDatePicker({
    startDate,
    endDate,
    onApply,
    name,
    maxDate,
    minDate,
    isRange: true,
    format,
    autoApply: true
  });
  React.useEffect(() => {
    if (startDate && endDate) {
      setInputValue(`${dayjs(startDate).format(format)} - ${dayjs(endDate).format(format)}`);
    }
  }, [startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  let calendarsDays = getRangeCalendarDays(year, month);
  const onInputChange = e => {
    let value = e.target.value;
    setInputValue(value);
    let [start, end] = value.split(" - ");
    if (dayjs(start).format(format) === start) {
      setStartTime(start);
    }
    if (dayjs(end).format(format) === end) {
      setEndTime(end);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: [className, "datepicker_wapper", isOpen ? 'active' : ""].join(" ")
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: inputValue,
    placeholder: placeholder,
    onClick: onOpenCalendar,
    onChange: onInputChange
  }), /*#__PURE__*/React.createElement(React.Fragment, null, isOpen && /*#__PURE__*/React.createElement("div", {
    className: "calendar_wapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calendar_control"
  }, /*#__PURE__*/React.createElement("div", getPreMonthProps(), " "), /*#__PURE__*/React.createElement("div", getNextMonthProps(), " ")), /*#__PURE__*/React.createElement("div", {
    className: "calendar_list"
  }, calendarsDays.map((calendar, index) => {
    let {
      days,
      year,
      month
    } = calendar;
    return /*#__PURE__*/React.createElement("div", {
      className: "calendar_div",
      key: `calendar${year}${month}_${index}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "calendar_header"
    }, /*#__PURE__*/React.createElement("div", null, " ", months[month]), /*#__PURE__*/React.createElement("div", null, " ", year)), /*#__PURE__*/React.createElement("div", {
      className: "calendar_content"
    }, weeks.map((week, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: `week_${index}`,
        className: "calendar_header"
      }, week);
    }), days.map((date, index) => {
      let {
        key,
        ...props
      } = getDayProps(date, month);
      return /*#__PURE__*/React.createElement("div", _extends({
        key: key
      }, props), getDayLabel(date));
    })));
  }))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "backdrop",
    onClick: onCloseCalendar
  })));
};

module.exports = DateRangePicker;
