var Highlighter = /** @class */ (function () {
    function Highlighter(_highlights) {
        if (_highlights === void 0) { _highlights = []; }
        this._highlights = _highlights;
        this._ranges = {};
    }
    Highlighter.prototype.addHighlight = function (highlight) {
        this._highlights.push(highlight);
    };
    Highlighter.prototype.addHighlights = function (highlights) {
        var _a;
        (_a = this._highlights).push.apply(_a, highlights);
    };
    return Highlighter;
}());
function scanPage() {
    var highlighter = new Highlighter();
    var relevantTags = ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre'];
    document.querySelectorAll(relevantTags.join(',')).forEach(function (element) {
        var range = document.createRange();
        range.selectNodeContents(element);
        var rects = range.getClientRects();
        for (var i = 0; i < rects.length; i++) {
            var rect = rects[i];
            highlighter.addHighlight({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                id: i
            });
        }
        console.log(highlighter);
    });
}
