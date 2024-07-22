# private key to solana cli json file
echo '<VOTRE_CLÉ_PRIVÉE>' | solana-keygen recover -o ~/.config/solana/id.json --force
echo '[1,2,3,...]' | solana-keygen recover -o ~/.config/solana/id.json --force

# public key from private key with solana cli format 
solana-keygen pubkey ~/.config/solana/id.json

# balance 
solana balance
solana balance --url https://api.devnet.solana.com

# laucnh local blockchain
solana-test-validator

# config solana
solana config set --url localhost
solana config set --url https://api.devnet.solana.com

# check programm id 
solana-keygen pubkey target/deploy/mpl_core_anchor_wrapper-keypair.json
then compare with the lib.rs 's one


# anchor command
anchor build
anchor deploy
anchor test

# synchronise key (progrmaId in idl.json / lib.rs / anchor.toml)
anchor keys sync


# get account info on devnet 
https://solscan.io/account/BGDWR7vHYwqw43d43XjepHPYBfF2LVNqgLT6DFcYfkM9?cluster=devnet
