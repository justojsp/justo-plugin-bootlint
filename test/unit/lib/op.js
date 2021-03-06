//imports
const path = require("path");
const suite = require("justo").suite;
const test = require("justo").test;
const op = require("../../../dist/es5/nodejs/justo-plugin-bootlint/lib/op").default;

//suite
suite("#op()", function() {
  const DATA_DIR = "test/unit/data";

  test("op(...src)", function() {
    op([path.join(DATA_DIR, "valid/file1.html"), path.join(DATA_DIR, "valid/file2.html")]).must.be.eq(0);
  });

  test("op(config)", function() {
    op([{
      src: [path.join(DATA_DIR, "valid/file1.html"), path.join(DATA_DIR, "valid/file2.html")],
      output: false
    }]).must.be.eq(0);
  });

  test("op(config)", function() {
    op([{
      src: [path.join(DATA_DIR, "valid/file1.html"), path.join(DATA_DIR, "valid/file2.html")],
      output: false
    }]).must.be.eq(0);
  });

  test("op(config) - warn check", function() {
    op([{
      src: path.join(DATA_DIR, "invalid/w001.html")
    }]).must.be.eq(1);
  });

  test("op(config) - warn check with output:false", function() {
    op([{
      src: path.join(DATA_DIR, "invalid/w001.html"),
      output: false
    }]).must.be.eq(1);
  });

  test("op(config) - error check", function() {
    op([{
      src: path.join(DATA_DIR, "invalid/e001.html")
    }]).must.be.eq(1);
  });

  test("op(config) - disable lint", function() {
    op([{
      src: path.join(DATA_DIR, "invalid/e001.html"),
      disable: "E001"
    }]).must.be.eq(0);
  });

  test("op(config) - lint a dir with valid files", function() {
    op([{
      src: DATA_DIR + "/valid/",
    }]).must.be.eq(0);
  });

  test("op(config) - lint a dir with invalid files", function() {
    op([{
      src: DATA_DIR + "/invalid/",
    }]).must.not.be.eq(0);
  });

  test("op(config) - lint a dir with valid, invalid files", function() {
    op([{
      src: DATA_DIR + "/"
    }]).must.not.be.eq(0);
  });

  test("op(config) - lint a dir with ignore", function() {
    op([{
      src: DATA_DIR + "/",
      ignore: DATA_DIR + "/invalid"
    }]).must.be.eq(0);
  });
})();
