import {
  ConfigPlugin,
  withPlugins,
  withProjectBuildGradle,
  withDangerousMod,
  WarningAggregator
} from '@expo/config-plugins';

import {
  mergeContents,
  removeContents,
} from "@expo/config-plugins/build/utils/generateCode";

const MODULE_NAME = "expo-gradle-ext-vars";

const EXT_BLOCK_ANCHOR_RE = /ext\s?.*\{/

const androidPlugin: ConfigPlugin<Map<string,string|boolean>> = (config, props) => {
  return withProjectBuildGradle(config, ({ modResults, ...subConfig }) => {
    if (modResults.language !== 'groovy') {
      WarningAggregator.addWarningAndroid(
        'withExpoGradleExtVars',
        `Cannot automatically configure project build.gradle if it's not groovy`,
      );
      return { modResults, ...subConfig };
    }

    // Does this build.gradle contain the ext {} block?
    if (!EXT_BLOCK_ANCHOR_RE.test(modResults.contents)) {
      // NO:  insert the ext {} block using standard Javascript replace, right above buildscript {} block, like this:
      //
      // ext {  // <--- INSERT ext block here.
      //
      // }
      //
      // buildscript {
      //   .
      //   .
      //   .
      // }
      //
      modResults.contents = modResults.contents.replace(/(buildscript)/, "ext {\n}\n\n$1");
    }

    modResults.contents = applyExtVars(modResults.contents, props);
    return { modResults, ...subConfig };
  });
}

const withExpoGradleExtVars: ConfigPlugin<{} | void> = (config, _props) => {
  const props = _props || {};

  return withPlugins(config, [
    [androidPlugin, new Map<string,string|boolean>(Object.entries(props))],
  ]);
};

const applyExtVars = (buildGradle: string, props:Map<string, string|boolean>) => {

  const newSrc = [];

  console.log('[ ' +  MODULE_NAME + '] applying ext vars to android/build.gradle', props);
  for (let [key, value] of props) {
    if (typeof(value) === 'boolean' || typeof(value) === 'number') {
      newSrc.push(`\t${key} = ${value}`)
    } else {
      newSrc.push(`\t${key} = "${value}"`)
    }
  }

  return mergeContents({
    tag: `${MODULE_NAME}`,
    src: buildGradle,
    newSrc: newSrc.join("\n"),
    anchor: EXT_BLOCK_ANCHOR_RE,
    offset: 1,
    comment: "//",
  }).contents;
}

export default withExpoGradleExtVars

