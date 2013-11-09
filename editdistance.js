
function EditDistance(pattern) {
  if (!(this instanceof EditDistance)) return new EditDistance(pattern);

  // Note Int32Array could be used here but apperently that is slower
  this.currentLeft = [];
  this.currentRight = [];
  this.lastLeft = [];
  this.lastRight = [];

  this.pattern = pattern;
  this.priorLeft = [];
  this.priorRight = [];
}
module.exports = EditDistance;

function intRound(num) {
  return num << 0;
}

var zeroVector = (function () {
  function ZeroVector() {
    this.zero = new Array(0);
    this.extend(100);
  }

  ZeroVector.prototype.extend = function (total) {
    for (var i = 0, l = total - this.zero.length; i < l; i++) this.zero.push(0);
  };

  ZeroVector.prototype.create = function (size) {
    if (size > this.zero.length) this.extend(size);
    return this.zero.slice(0, size);
  };
  return new ZeroVector();
})();

EditDistance.prototype.distance = function (target) {
  var targetLength = target.length;

  var main = this.pattern.length - targetLength;
  var distance = Math.abs(main);

  if (main <= 0) {
    this.ensureCapacityRight(distance, false);
    for (var j = 0; j <= distance; j++) {
      this.lastRight[j] = distance - j - 1;
      this.priorRight[j] = -1;
    }
  } else {
    this.ensureCapacityLeft(distance, false);
    for (var j = 0; j <= distance; j++) {
      this.lastLeft[j] = -1;
      this.priorLeft[j] = -1;
    }
  }

  var even = true;
  while (true) {
    var offDiagonal = intRound((distance - main) / 2);
    this.ensureCapacityRight(offDiagonal, true);

    if (even) {
      this.lastRight[offDiagonal] = -1;
    }

    var immediateRight = -1;
    for (; offDiagonal > 0; offDiagonal--) {
      this.currentRight[offDiagonal] = immediateRight = this.computeRow(
        (main + offDiagonal), (distance - offDiagonal),
        this.pattern, target,
        this.priorRight[offDiagonal - 1], this.lastRight[offDiagonal], immediateRight
      );
    }

    var offDiagonal = intRound((distance + main) / 2);
    this.ensureCapacityLeft(offDiagonal, true);

    if (even) {
      this.lastLeft[offDiagonal] = intRound((distance - main) / 2) - 1;
    }

    var immediateLeft = even ? -1 : intRound((distance - main) / 2);

    for (; offDiagonal > 0; offDiagonal--) {
      this.currentLeft[offDiagonal] = immediateLeft = this.computeRow(
        (main - offDiagonal), (distance - offDiagonal),
        this.pattern, target,
        immediateLeft, this.lastLeft[offDiagonal], this.priorLeft[offDiagonal - 1]
      );
    }

    var mainRow = this.computeRow(
      main, distance,
      this.pattern, target,
      immediateLeft, this.lastLeft[0], immediateRight
    );

    if ((mainRow === targetLength) || (++distance > Infinity) || (distance < 0)) {
      break;
    }

    this.currentLeft[0] = this.currentRight[0] = mainRow;

    var tmp = this.priorLeft;
    this.priorLeft = this.lastLeft;
    this.lastLeft = this.currentLeft;
    this.currentLeft = this.priorLeft;

    var tmp = this.priorRight;
    this.priorRight = this.lastRight;
    this.lastRight = this.currentRight;
    this.currentRight = tmp;

    even = !even;
  }

  return distance;
};

EditDistance.prototype.computeRow = function(main, distance, a, b, knownLeft, knownAbove, knownRight) {
  var t;
  if (distance === 0) {
    t = 0;
  } else {
    t = Math.max(Math.max(knownAbove, knownRight) + 1, knownLeft);
  }

  var tmax = Math.min(b.length, (a.length - main));

  while ((t < tmax) && b[t] === a[t + main]) {
    t++;
  }

  return t;
};

EditDistance.prototype.ensureCapacityLeft = function (index, copy) {
  if (this.currentLeft.length <= index) {
    index++;
    this.priorLeft = this.resize(this.priorLeft, index, copy);
    this.lastLeft = this.resize(this.lastLeft, index, copy);
    this.currentLeft = this.resize(this.currentLeft, index, false);
  }
};

EditDistance.prototype.ensureCapacityRight = function (index, copy) {
  if (this.currentRight.length <= index) {
    index++;
    this.priorRight = this.resize(this.priorRight, index, copy);
    this.lastRight = this.resize(this.lastRight, index, copy);
    this.currentRight = this.resize(this.currentRight, index, false);
  }
};

EditDistance.prototype.resize = function (array, size, copy) {
  if (copy) {
    return array.concat(zeroVector.create(size - array.length));
  } else {
    return zeroVector.create(size);
  }
};
