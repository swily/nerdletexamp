# workshop/lab1

This repo has been spun up locally only.

## Getting started

## Getting started

1. Connect to the VPN
2. Set datanerd alias if not set: `npm config set @datanerd:registry=https://pdx-artifacts.pdx.vm.datanerd.us/api/npm/newrelic-js-local/`
3. Install NR1 CLI tools `npm install -g @datanerd/nr1-package`
 * In case you encounter errors related to permissions and access during installation, the following environment change allows successful installation of nr1-package
 `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`
 * The above also eases installation of npm packages using the -g flag without using sudo.
4. Run the following

```bash
# if you haven't cloned the workshop repod already
git clone git@source.datanerd.us:futurians/workshop.git
# then change directory into lab1
cd workshop/lab1
npm install
npm start
```

## Lab Instructions

[Go forth and learn thyself of Vizco dear Relic](INSTRUCTIONS.md)!