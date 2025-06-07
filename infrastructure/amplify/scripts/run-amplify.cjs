const readline = require("readline");
const { exec } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your AWS profile name: ", (profile) => {
  rl.question(
    "Enter a sandbox identifier (or leave blank for default): ",
    (identifier) => {
      let command = `npx ampx sandbox --profile ${profile}`;
      if (identifier.trim()) {
        command += ` --identifier ${identifier.trim()}`;
      }

      console.log(`\n▶ Running: ${command}\n`);

      exec(command, { cwd: __dirname + "/../.." }, (err, stdout, stderr) => {
        if (err) {
          console.error(`❌ Error: ${err.message}`);
          return;
        }
        if (stderr) {
          console.error(`⚠️ stderr: ${stderr}`);
        }
        console.log(stdout);
      });

      rl.close();
    }
  );
});
