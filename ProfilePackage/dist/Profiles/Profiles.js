"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Today = _interopRequireDefault(require("@material-ui/icons/Today"));

var _Star = _interopRequireDefault(require("@material-ui/icons/Star"));

var _GlobalStyles = require("../components/GlobalStyles/GlobalStyles");

var _ProfileLoading = require("../components/Loading/ProfileLoading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Profiles = function Profiles(props) {
  var profileList = props.profileList,
      handleButtonClick = props.handleButtonClick,
      isLoading = props.isLoading;
  return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 3
  }, isLoading && /*#__PURE__*/_react["default"].createElement(_ProfileLoading.ProfileLoading, null), !isLoading && profileList.length > 0 && profileList.map(function (profile, idx) {
    return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
      variant: "outlined",
      className: "".concat((0, _GlobalStyles.GlobalStyles)().parent, " ").concat((0, _GlobalStyles.GlobalStyles)().mb1),
      key: idx
    }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      md: 3,
      xs: 12
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _GlobalStyles.GlobalStyles)().alignCenter
    }, /*#__PURE__*/_react["default"].createElement(_Avatar["default"], {
      variant: "circle",
      className: (0, _GlobalStyles.GlobalStyles)().avatar,
      src: profile.user.avatar
    }))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      md: 6,
      xs: 12
    }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      className: (0, _GlobalStyles.GlobalStyles)().ml1,
      color: "textPrimary",
      variant: "h5",
      gutterBottom: true
    }, profile.user.user_name), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      color: "textSecondary",
      className: "".concat((0, _GlobalStyles.GlobalStyles)().subText, " ").concat((0, _GlobalStyles.GlobalStyles)().textUpper),
      gutterBottom: true
    }, profile.specializations.join(',')), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      color: "textSecondary",
      className: "".concat((0, _GlobalStyles.GlobalStyles)().subText, " ").concat((0, _GlobalStyles.GlobalStyles)().mb1),
      gutterBottom: true
    }, profile.total_experience, " years experience overall."), profile.clinics.length > 0 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      color: "textSecondary",
      className: "".concat((0, _GlobalStyles.GlobalStyles)().subText, "\n                      ").concat((0, _GlobalStyles.GlobalStyles)().mb1, "\n                      ").concat((0, _GlobalStyles.GlobalStyles)().fontBold),
      gutterBottom: true
    }, profile.clinics[0].clinic_address), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      color: "textSecondary",
      className: "".concat((0, _GlobalStyles.GlobalStyles)().subText, " ").concat((0, _GlobalStyles.GlobalStyles)().mb1),
      gutterBottom: true
    }, profile.clinics[0].clinic_name, profile.clinics.length > 1 && " +".concat(profile.clinics.length - 1, " More")), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      color: "textSecondary",
      className: "".concat((0, _GlobalStyles.GlobalStyles)().subText, " ").concat((0, _GlobalStyles.GlobalStyles)().mb1),
      gutterBottom: true
    }, "".concat(profile.clinics[0].fees, " Consultation fee at clinic."))), profile.reviews.length > 0 && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      display: "flex",
      ml: 2,
      alignItems: "center"
    }, /*#__PURE__*/_react["default"].createElement(_Chip["default"], {
      className: (0, _GlobalStyles.GlobalStyles)().greenBackground,
      label: profile.average_rating,
      icon: /*#__PURE__*/_react["default"].createElement(_Star["default"], {
        style: {
          color: '#fff'
        }
      })
    }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      color: "textPrimary",
      className: "".concat((0, _GlobalStyles.GlobalStyles)().subText, "\n                      ").concat((0, _GlobalStyles.GlobalStyles)().fontBold, "\n                      ").concat((0, _GlobalStyles.GlobalStyles)().textUnderline)
    }, profile.reviews.length, " Patient Comments."))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      md: 3,
      xs: 12
    }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      height: '100%',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      ml: 1,
      mr: 1
    }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      startIcon: /*#__PURE__*/_react["default"].createElement(_Today["default"], {
        className: (0, _GlobalStyles.GlobalStyles)().greenText
      }),
      className: "".concat((0, _GlobalStyles.GlobalStyles)().greenText, "\n                    ").concat((0, _GlobalStyles.GlobalStyles)().fontBold, "\n                    ").concat((0, _GlobalStyles.GlobalStyles)().mb1)
    }, "Available Today"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      onClick: function onClick(e) {
        e.stopPropagation();
        handleButtonClick(profile._id);
      },
      className: "".concat((0, _GlobalStyles.GlobalStyles)().mb1, " ").concat((0, _GlobalStyles.GlobalStyles)().fontBold),
      variant: "contained",
      color: "primary"
    }, "Book Appointment"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      className: "".concat((0, _GlobalStyles.GlobalStyles)().fontBold, " \n                    ").concat((0, _GlobalStyles.GlobalStyles)().hoverUnderline),
      variant: "outlined",
      onClick: function onClick(e) {
        e.stopPropagation();
        handleButtonClick(profile._id);
      }
    }, "View Profile"))));
  }), !isLoading && profileList.length === 0 && /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement("p", null, "No Profiles Found...")));
};

Profiles.propTypes = {
  profileList: _propTypes["default"].array.isRequired,
  isLoading: _propTypes["default"].bool.isRequired,
  handleButtonClick: _propTypes["default"].func.isRequired
};
var _default = Profiles;
exports["default"] = _default;