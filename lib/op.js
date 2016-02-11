//imports
import os from "os";
import child_process from "child_process";

/**
 * Task operation.
 */
export default function op(params) {
  var cmd, args = [], res;

  //(1) arguments
  if (params.length === 0) {
    params = {src: []};
  } else if (params.length === 1) {
    if (typeof(params[0]) =="string") params = {src: [params[0]]};
    else params = params[0];
  } else if (params.length >= 2) {
    params = {src: params};
  }

  if (typeof(params.src) == "string") params.src = [params.src];
  if (typeof(params.disable) == "string") params.disable = [params.disable];
  if (!params.hasOwnProperty("output")) params.output = true;

  //(2) determine command
  if (/^win/.test(os.platform())) cmd = "bootlint.cmd";
  else cmd = "bootlint";

  if (params.disable) {
    args.push("--disable");
    args.push(params.disable.join(","));
  }

  for (let f of params.src) args.push(f);

  //(3) run
  res = child_process.spawnSync(cmd, args);

  if (params.output) {
    let msg;

    msg = res.stdout.toString();
    if (!/\s0 lint error\(s\) found across/.test(msg)) console.log(msg);

    msg = res.stderr.toString();
    if (msg !== "") console.log(msg);
  }

  //(4) return
  return res.status;
}
