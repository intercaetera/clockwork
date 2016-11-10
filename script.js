"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var textarea = document.querySelector("#text-field");

var ToolbarElement = function ToolbarElement(title, description) {
  _classCallCheck(this, ToolbarElement);

  this.title = title; //what shows in the toolbar
  this.description = description; //tooltip
  addElementToToolbar(this);
};

//Inserts a single tag into the code.


var GenericStaticElement = function (_ToolbarElement) {
  _inherits(GenericStaticElement, _ToolbarElement);

  function GenericStaticElement(title, description, tag) {
    _classCallCheck(this, GenericStaticElement);

    var _this = _possibleConstructorReturn(this, (GenericStaticElement.__proto__ || Object.getPrototypeOf(GenericStaticElement)).call(this, title, description));

    _this.tag = tag; //[tag][/tag]
    return _this;
  }

  //Adds a tag in the text.


  _createClass(GenericStaticElement, [{
    key: "activate",
    value: function activate(input) {
      var selected = getSelectedText(input);
      var wrapped = "[" + this.tag + "]";
      input.value = selected.before + wrapped + selected.centre + selected.after;
    }
  }]);

  return GenericStaticElement;
}(ToolbarElement);

//Wraps selected text.


var GenericElement = function (_GenericStaticElement) {
  _inherits(GenericElement, _GenericStaticElement);

  function GenericElement(title, description, tag) {
    _classCallCheck(this, GenericElement);

    return _possibleConstructorReturn(this, (GenericElement.__proto__ || Object.getPrototypeOf(GenericElement)).call(this, title, description, tag));
  }

  //Wraps the input in the chosen tags.


  _createClass(GenericElement, [{
    key: "activate",
    value: function activate(input) {
      var selected = getSelectedText(input);
      var wrapped = "[" + this.tag + "]" + selected.centre + "[/" + this.tag + "]";
      input.value = selected.before + wrapped + selected.after;
    }
  }]);

  return GenericElement;
}(GenericStaticElement);

//Top-level class for popups.


var PopupElement = function () {
  function PopupElement(title, description, tag) {
    _classCallCheck(this, PopupElement);

    this.title = title;
    this.description = description;
    this.tag = tag;
    addElementToToolbar(this);
  }

  _createClass(PopupElement, [{
    key: "activate",
    value: function activate(input) {

      //Generate all the popup elements.
      var popup = document.createElement("div");
      popup.classList.add("popup");
      document.querySelector(".wrapper").appendChild(popup);

      var popupTitleContainer = document.createElement("div");
      popupTitleContainer.classList.add("title");
      popup.appendChild(popupTitleContainer);

      var popupTitle = document.createElement("h3");
      popupTitle.textContent = this.description;
      popupTitleContainer.appendChild(popupTitle);

      var popupClose = document.createElement("span");
      popupClose.textContent = "X";
      popupTitleContainer.appendChild(popupClose);
      popupClose.addEventListener("click", this.close);

      var popupContent = document.createElement("div");
      popupContent.classList.add("content");
      popup.appendChild(popupContent);

      var popupForm = document.createElement("form");
      popupContent.appendChild(popupForm);

      var popupSubmitButton = document.createElement("input");
      popupSubmitButton.setAttribute("type", "submit");
      popupForm.appendChild(popupSubmitButton);

      //Show the popup.
      popup.style.display = "flex";

      //Return object.
      var obj = {
        popup: popup,
        popupTitleContainer: popupTitleContainer,
        popupTitle: popupTitle,
        popupClose: popupClose,
        popupContent: popupContent,
        popupForm: popupForm,
        popupSubmitButton: popupSubmitButton
      };

      return obj;
    }
  }, {
    key: "close",
    value: function close() {
      //Close the popup.
      var wrapper = document.querySelector(".wrapper");
      var popup = document.querySelector(".popup");
      wrapper.removeChild(popup);
    }
  }]);

  return PopupElement;
}();

//Element with a single label and text input.


var PopupInputElement = function (_PopupElement) {
  _inherits(PopupInputElement, _PopupElement);

  function PopupInputElement(title, description, tag, label) {
    _classCallCheck(this, PopupInputElement);

    var _this3 = _possibleConstructorReturn(this, (PopupInputElement.__proto__ || Object.getPrototypeOf(PopupInputElement)).call(this, title, description, tag));

    _this3.label = label;
    return _this3;
  }

  _createClass(PopupInputElement, [{
    key: "activate",
    value: function activate(input) {
      var _this4 = this;

      var obj = _get(PopupInputElement.prototype.__proto__ || Object.getPrototypeOf(PopupInputElement.prototype), "activate", this).call(this);

      var label = document.createElement("p");
      label.textContent = this.label;
      obj.popupForm.appendChild(label);
      obj.popupForm.insertBefore(label, obj.popupForm.childNodes[0]);

      var textInput = document.createElement("input");
      textInput.setAttribute("type", "text");
      obj.popupForm.appendChild(textInput);
      obj.popupForm.insertBefore(textInput, obj.popupForm.childNodes[1]);
      textInput.focus();

      var form = obj.popupForm;
      form.addEventListener("submit", function (event) {
        if (event.preventDefault) event.preventDefault();

        var attribute = textInput.value;
        var selected = getSelectedText(textarea);
        var output = void 0;
        if (attribute.trim() != "") {
          //if the input box is not empty
          output = selected.before + "[" + _this4.tag + "=" + attribute + "]" + selected.centre + "[/" + _this4.tag + "]" + selected.after;
        } else {
          output = selected.before + "[" + _this4.tag + "]" + selected.centre + "[/" + _this4.tag + "]" + selected.after;
        }
        textarea.value = output;

        _get(PopupInputElement.prototype.__proto__ || Object.getPrototypeOf(PopupInputElement.prototype), "close", _this4).call(_this4);
      });
    }
  }]);

  return PopupInputElement;
}(PopupElement);

//Element with a single label and colour input.


var PopupColourElement = function (_PopupElement2) {
  _inherits(PopupColourElement, _PopupElement2);

  function PopupColourElement(title, description, tag, label) {
    _classCallCheck(this, PopupColourElement);

    var _this5 = _possibleConstructorReturn(this, (PopupColourElement.__proto__ || Object.getPrototypeOf(PopupColourElement)).call(this, title, description, tag));

    _this5.label = label;
    return _this5;
  }

  _createClass(PopupColourElement, [{
    key: "activate",
    value: function activate(input) {
      var _this6 = this;

      var obj = _get(PopupColourElement.prototype.__proto__ || Object.getPrototypeOf(PopupColourElement.prototype), "activate", this).call(this);

      var label = document.createElement("p");
      label.textContent = this.label;
      obj.popupForm.appendChild(label);
      obj.popupForm.insertBefore(label, obj.popupForm.childNodes[0]);

      var colorInput = document.createElement("input");
      colorInput.setAttribute("type", "color");
      obj.popupForm.appendChild(colorInput);
      obj.popupForm.insertBefore(colorInput, obj.popupForm.childNodes[1]);
      colorInput.focus();

      obj.popupForm.addEventListener("submit", function (event) {
        if (event.preventDefault) event.preventDefault();

        var attribute = colorInput.value;
        var selected = getSelectedText(textarea);
        var output = void 0;
        if (attribute.trim() != "") {
          //if the input box is not empty
          output = selected.before + "[" + _this6.tag + "=" + attribute + "]" + selected.centre + "[/" + _this6.tag + "]" + selected.after;
        } else {
          output = selected.before + "[" + _this6.tag + "]" + selected.centre + "[/" + _this6.tag + "]" + selected.after;
        }
        textarea.value = output;

        _get(PopupColourElement.prototype.__proto__ || Object.getPrototypeOf(PopupColourElement.prototype), "close", _this6).call(_this6);
      });
    }
  }]);

  return PopupColourElement;
}(PopupElement);

var PopupComboElement = function (_PopupElement3) {
  _inherits(PopupComboElement, _PopupElement3);

  function PopupComboElement(title, description, tag, label, options) {
    _classCallCheck(this, PopupComboElement);

    var _this7 = _possibleConstructorReturn(this, (PopupComboElement.__proto__ || Object.getPrototypeOf(PopupComboElement)).call(this, title, description, tag));

    _this7.label = label;
    _this7.options = options;
    return _this7;
  }

  _createClass(PopupComboElement, [{
    key: "activate",
    value: function activate(input) {
      var _this8 = this;

      var obj = _get(PopupComboElement.prototype.__proto__ || Object.getPrototypeOf(PopupComboElement.prototype), "activate", this).call(this);

      var label = document.createElement("p");
      label.textContent = this.label;
      obj.popupForm.appendChild(label);
      obj.popupForm.insertBefore(label, obj.popupForm.childNodes[0]);

      var select = document.createElement("select");
      obj.popupForm.appendChild(select);
      obj.popupForm.insertBefore(select, obj.popupForm.childNodes[1]);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          console.log(element);
          var option = document.createElement("option");
          option.textContent = element;
          option.setAttribute("type", element);
          select.appendChild(option);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      obj.popupForm.addEventListener("submit", function (event) {
        if (event.preventDefault) event.preventDefault();

        var attribute = select.options[select.selectedIndex].value;
        var selected = getSelectedText(textarea);
        var output = selected.before + "[" + _this8.tag + "=" + attribute + "]" + selected.centre + "[/" + _this8.tag + "]";
        textarea.value = output;

        _get(PopupComboElement.prototype.__proto__ || Object.getPrototypeOf(PopupComboElement.prototype), "close", _this8).call(_this8);
      });
    }
  }]);

  return PopupComboElement;
}(PopupElement);

//Append element to the toolbar


function addElementToToolbar(element) {
  var para = document.createElement("div");
  para.classList.add("toolbar-button");
  para.textContent = element.title;
  document.querySelector(".toolbar").appendChild(para);
  para.addEventListener("click", function () {
    element.activate(textarea);
  });
}

function addSeparator() {
  var para = document.createElement("div");
  para.classList.add("toolbar-separator");
  para.textContent = " | ";
  document.querySelector(".toolbar").appendChild(para);
}

//Get selected text and return everything before it, inside, and after.
function getSelectedText(input) {
  var start = input.selectionStart;
  var end = input.selectionEnd;

  var object = {
    before: input.value.substring(0, start),
    centre: input.value.substring(start, end),
    after: input.value.substring(end)
  };

  return object;
}

//Toolbar items
var bold = new GenericElement("b", "Bold", "b");
var italic = new GenericElement("i", "Italic", "i");
var underline = new GenericElement("u", "Underline", "u");
var strikethrough = new GenericElement("s", "Strikethrough", "s");

addSeparator();

var indent = new GenericElement("indent", "Absolute indentation", "indent");
var code = new GenericElement("code", "Code block", "code");

addSeparator();

var list = new GenericElement("list", "Unordered list", "list");
var orderedList = new GenericElement("list=1", "Ordered list", "list=1");
var bulletPoint = new GenericStaticElement("*", "List point", "*");

addSeparator();

var hr = new GenericStaticElement("hr", "Horizontal rule", "hr");

addSeparator();

var url = new PopupInputElement("url", "Hyperlink", "url", "Insert URL:");
var quote = new PopupInputElement("quote", "Quote", "quote", "Insert the author's name:");
var piAmount = new PopupInputElement("pi", "Percentage indent", "pi", "Indentation percent:");

addSeparator();

var color = new PopupColourElement("color", "Colour", "color", "Choose a colour:");

addSeparator();

var align = new PopupComboElement("align", "Text align", "align", "Align direction:", ['left', 'center', 'right', 'justify']);
//# sourceMappingURL=/home/mrhudson/nodejs/script.js.map