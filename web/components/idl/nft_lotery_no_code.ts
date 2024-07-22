/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/nft_lotery_no_code.json`.
 */
export type NftLoteryNoCode = {
  "address": "BFeJzozj43cFUMcNBYkEj6VR68Wcpqy34big4LjrqXho",
  "metadata": {
    "name": "nftLoteryNoCode",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createCollectionV1",
      "discriminator": [
        71,
        98,
        203,
        162,
        193,
        109,
        187,
        240
      ],
      "accounts": [
        {
          "name": "collection",
          "docs": [
            "The address of the new asset."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "updateAuthority",
          "docs": [
            "The authority on the new asset."
          ],
          "optional": true
        },
        {
          "name": "signer",
          "docs": [
            "The account paying for the storage fees."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "mplCore",
          "docs": [
            "The MPL Core program."
          ],
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "jackpotVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  99,
                  107,
                  112,
                  111,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "createCollectionV1Args"
            }
          }
        }
      ]
    },
    {
      "name": "createNftV1",
      "discriminator": [
        47,
        164,
        243,
        205,
        110,
        135,
        226,
        230
      ],
      "accounts": [
        {
          "name": "asset",
          "docs": [
            "The address of the new asset."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "collection",
          "docs": [
            "The collection to which the asset belongs."
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "authority",
          "docs": [
            "The authority signing for creation."
          ],
          "signer": true,
          "optional": true
        },
        {
          "name": "signer",
          "docs": [
            "The account paying for the storage fees."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "docs": [
            "The owner of the new asset. Defaults to the authority if not present."
          ],
          "optional": true
        },
        {
          "name": "updateAuthority",
          "docs": [
            "The authority on the new asset."
          ],
          "optional": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "logWrapper",
          "docs": [
            "The SPL Noop program."
          ],
          "optional": true
        },
        {
          "name": "mplCore",
          "docs": [
            "The MPL Core program."
          ],
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "jackpotVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  99,
                  107,
                  112,
                  111,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "createNftV1Args"
            }
          }
        }
      ]
    },
    {
      "name": "initJackpotVault",
      "discriminator": [
        232,
        109,
        117,
        250,
        140,
        252,
        238,
        130
      ],
      "accounts": [
        {
          "name": "jackpotVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  99,
                  107,
                  112,
                  111,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "transferV1",
      "discriminator": [
        219,
        95,
        64,
        10,
        55,
        137,
        133,
        109
      ],
      "accounts": [
        {
          "name": "asset",
          "docs": [
            "The address of the asset."
          ],
          "writable": true
        },
        {
          "name": "collection",
          "docs": [
            "The collection to which the asset belongs."
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for the storage fees."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "docs": [
            "The owner or delegate of the asset."
          ],
          "signer": true,
          "optional": true
        },
        {
          "name": "newOwner",
          "docs": [
            "The new owner of the asset."
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "optional": true
        },
        {
          "name": "logWrapper",
          "docs": [
            "The SPL Noop program."
          ],
          "optional": true
        },
        {
          "name": "mplCore",
          "docs": [
            "The MPL Core program."
          ],
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "transferV1Args"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "jackpotVault",
      "discriminator": [
        92,
        180,
        135,
        82,
        50,
        74,
        83,
        167
      ]
    }
  ],
  "events": [
    {
      "name": "jackpotBalance",
      "discriminator": [
        98,
        93,
        159,
        104,
        169,
        105,
        221,
        112
      ]
    },
    {
      "name": "jackpotWin",
      "discriminator": [
        106,
        249,
        41,
        138,
        58,
        15,
        197,
        73
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidPluginType",
      "msg": "Invalid plugin type"
    },
    {
      "code": 6001,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6002,
      "name": "clockRetrievalFailed",
      "msg": "Clock retrieval failed"
    },
    {
      "code": 6003,
      "name": "overflow",
      "msg": "overflow"
    },
    {
      "code": 6004,
      "name": "underflow",
      "msg": "underflow"
    }
  ],
  "types": [
    {
      "name": "addBlocker",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "attribute",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "attributes",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "attributeList",
            "type": {
              "vec": {
                "defined": {
                  "name": "attribute"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "burnDelegate",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "createCollectionV1Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "plugins",
            "type": {
              "option": {
                "vec": {
                  "defined": {
                    "name": "pluginAuthorityPair"
                  }
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "createNftV1Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "plugins",
            "type": {
              "option": {
                "vec": {
                  "defined": {
                    "name": "pluginAuthorityPair"
                  }
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "percentage",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "edition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "number",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "freezeDelegate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "frozen",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "immutableMetadata",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "jackpotBalance",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "remainingTickets",
            "type": "u32"
          },
          {
            "name": "balance",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "jackpotVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "depositedFeeNumber",
            "type": "u32"
          },
          {
            "name": "remainingTickets",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "jackpotWin",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "winner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "masterEdition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxSupply",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "uri",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "permanentBurnDelegate",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "permanentFreezeDelegate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "frozen",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "permanentTransferDelegate",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "plugin",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "royalties",
            "fields": [
              {
                "defined": {
                  "name": "royalties"
                }
              }
            ]
          },
          {
            "name": "freezeDelegate",
            "fields": [
              {
                "defined": {
                  "name": "freezeDelegate"
                }
              }
            ]
          },
          {
            "name": "burnDelegate",
            "fields": [
              {
                "defined": {
                  "name": "burnDelegate"
                }
              }
            ]
          },
          {
            "name": "transferDelegate",
            "fields": [
              {
                "defined": {
                  "name": "transferDelegate"
                }
              }
            ]
          },
          {
            "name": "updateDelegate",
            "fields": [
              {
                "defined": {
                  "name": "updateDelegate"
                }
              }
            ]
          },
          {
            "name": "permanentFreezeDelegate",
            "fields": [
              {
                "defined": {
                  "name": "permanentFreezeDelegate"
                }
              }
            ]
          },
          {
            "name": "attributes",
            "fields": [
              {
                "defined": {
                  "name": "attributes"
                }
              }
            ]
          },
          {
            "name": "permanentTransferDelegate",
            "fields": [
              {
                "defined": {
                  "name": "permanentTransferDelegate"
                }
              }
            ]
          },
          {
            "name": "permanentBurnDelegate",
            "fields": [
              {
                "defined": {
                  "name": "permanentBurnDelegate"
                }
              }
            ]
          },
          {
            "name": "edition",
            "fields": [
              {
                "defined": {
                  "name": "edition"
                }
              }
            ]
          },
          {
            "name": "masterEdition",
            "fields": [
              {
                "defined": {
                  "name": "masterEdition"
                }
              }
            ]
          },
          {
            "name": "addBlocker",
            "fields": [
              {
                "defined": {
                  "name": "addBlocker"
                }
              }
            ]
          },
          {
            "name": "immutableMetadata",
            "fields": [
              {
                "defined": {
                  "name": "immutableMetadata"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "pluginAuthority",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "none"
          },
          {
            "name": "owner"
          },
          {
            "name": "updateAuthority"
          },
          {
            "name": "address",
            "fields": [
              {
                "name": "address",
                "type": "pubkey"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "pluginAuthorityPair",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "plugin",
            "type": {
              "defined": {
                "name": "plugin"
              }
            }
          },
          {
            "name": "authority",
            "type": {
              "option": {
                "defined": {
                  "name": "pluginAuthority"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "royalties",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "basisPoints",
            "type": "u16"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": {
                  "name": "creator"
                }
              }
            }
          },
          {
            "name": "ruleSet",
            "type": {
              "defined": {
                "name": "ruleSet"
              }
            }
          }
        ]
      }
    },
    {
      "name": "ruleSet",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "none"
          },
          {
            "name": "programAllowList",
            "fields": [
              {
                "vec": "pubkey"
              }
            ]
          },
          {
            "name": "programDenyList",
            "fields": [
              {
                "vec": "pubkey"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "transferDelegate",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "transferV1Args",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "updateDelegate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "additionalDelegates",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "jackpotSeed",
      "type": "string",
      "value": "\"jackpot_vault\""
    }
  ]
};
