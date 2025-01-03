import _extends from '@babel/runtime/helpers/extends';
import React from 'react';

const SingleCalendar = _ref => {
  let {
    getNextMonthProps,
    getPreMonthProps,
    calendarsDays,
    weeks,
    months,
    month,
    year,
    getDayProps,
    getDayLabel,
    isOpen,
    onClose
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, isOpen && /*#__PURE__*/React.createElement("div", {
    className: "calendar_wapper single"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calendar_control"
  }, /*#__PURE__*/React.createElement("div", getPreMonthProps(), " "), /*#__PURE__*/React.createElement("div", getNextMonthProps(), " ")), /*#__PURE__*/React.createElement("div", {
    className: "calendar_header"
  }, /*#__PURE__*/React.createElement("div", null, " ", months[month]), /*#__PURE__*/React.createElement("div", null, " ", year)), /*#__PURE__*/React.createElement("div", {
    className: "calendar_content "
  }, weeks.map((week, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: `week_${index}`,
      className: "calendar_header"
    }, week);
  }), calendarsDays.map((date, index) => {
    let {
      key,
      ...props
    } = getDayProps(date, month);
    return /*#__PURE__*/React.createElement("div", _extends({
      key: key
    }, props), getDayLabel(date));
  }))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "backdrop",
    onClick: onClose
  }));
};

export { SingleCalendar as default };
