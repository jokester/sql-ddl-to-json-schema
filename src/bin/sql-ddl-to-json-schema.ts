import { promises as fsp } from "fs";
import { Parser } from "../parser";


setTimeout(async () => {
  const sql = `
  CREATE TABLE \`MediaLives\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
  \`cardId\` bigint(20) unsigned NOT NULL,
  \`fanclubId\` bigint(20) unsigned NOT NULL,
  \`body\` text,
  \`thumbnailUrl\` varchar(255) NOT NULL,
  \`fileUrl\` varchar(255) DEFAULT NULL,
  \`fanistreamFileUrl\` varchar(255) DEFAULT NULL,
  \`externalFileUrl\` varchar(255) DEFAULT NULL,
  \`playbackUrl\` varchar(255) DEFAULT NULL,
  \`liveServerUrl\` varchar(255) DEFAULT NULL,
  \`channelName\` varchar(255) DEFAULT NULL,
  \`channelArn\` varchar(255) DEFAULT NULL,
  \`isChannelDeleted\` tinyint(1) NOT NULL DEFAULT '0',
  \`liveKey\` varchar(255) NOT NULL,
  \`isReserved\` tinyint(1) NOT NULL DEFAULT '0',
  \`reservedLiveId\` bigint(20) unsigned DEFAULT NULL,
  \`isFanistream\` tinyint(1) NOT NULL DEFAULT '0',
  \`isExternal\` tinyint(1) NOT NULL DEFAULT '0',
  \`isBigIcon\` tinyint(1) NOT NULL DEFAULT '0',
  \`isCustomizedThumbnail\` tinyint(1) NOT NULL DEFAULT '0',
  \`type\` tinyint(1) NOT NULL DEFAULT '0',
  \`orientation\` tinyint(1) NOT NULL DEFAULT '0',
  \`status\` tinyint(2) NOT NULL DEFAULT '0',
  \`fanistreamStatus\` tinyint(2) NOT NULL DEFAULT '-1',
  \`externalStatus\` tinyint(2) NOT NULL DEFAULT '-1',
  \`archiveStatus\` tinyint(2) NOT NULL DEFAULT '1',
  \`liveServerId\` int(11) unsigned NOT NULL DEFAULT '1',
  \`firebaseUrl\` varchar(255) DEFAULT NULL,
  \`firestoreProjectId\` varchar(255) DEFAULT NULL,
  \`sid\` varchar(255) DEFAULT NULL,
  \`resourceId\` text,
  \`metadata\` json DEFAULT NULL,
  \`scheduledEndAt\` datetime DEFAULT NULL,
  \`isAlerted\` tinyint(1) NOT NULL DEFAULT '0',
  \`alertedReasons\` json DEFAULT NULL,
  \`liveMemorialId\` bigint(20) DEFAULT NULL,
  \`updatedAt\` datetime NOT NULL,
  \`createdAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`idx_media_live_1\` (\`cardId\`),
  KEY \`idx_live_status\` (\`status\`),
  KEY \`idx_ticket_live_1\` (\`reservedLiveId\`),
  KEY \`idx_media_live_fanclub_1\` (\`fanclubId\`),
  KEY \`idx_media_live_2\` (\`sid\`)
) ENGINE=InnoDB AUTO_INCREMENT=105172 DEFAULT CHARSET=utf8mb4;`

  const parser = new Parser("mysql");

  /**
   * Get the JSON Schema if you need to modify it...
   */
  const jsonSchemaDocuments = parser.feed(sql).toJsonSchemaArray({useRef: false});

  /**
   * Or explore the compact JSON format...
   */
  const compactJsonTablesArray = parser.feed(sql).toCompactJson(parser.results);

  await fsp.writeFile('tron-ddl.json', JSON.stringify(jsonSchemaDocuments, null, 2))

}, 0);
