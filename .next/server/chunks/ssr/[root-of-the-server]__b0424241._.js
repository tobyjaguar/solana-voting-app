module.exports = {

"[externals]/process [external] (process, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}}),
"[project]/app/utils/pdas.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getCandidatePDA": (()=>getCandidatePDA),
    "getPollPDA": (()=>getPollPDA),
    "getVoterRecordPDA": (()=>getVoterRecordPDA)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/web3.js/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/constants.ts [app-ssr] (ecmascript)");
;
;
const getPollPDA = (pollId)=>{
    const pollIdBuffer = pollId.toArrayLike(Buffer, 'le', 8);
    const [pda] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
        pollIdBuffer
    ], __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PROGRAM_ID"]);
    return pda;
};
const getCandidatePDA = (pollId, candidateName)=>{
    const pollIdBuffer = pollId.toArrayLike(Buffer, 'le', 8);
    const [pda] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
        pollIdBuffer,
        Buffer.from(candidateName)
    ], __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PROGRAM_ID"]);
    return pda;
};
const getVoterRecordPDA = (pollId, candidateName, voterPubkey)=>{
    const pollIdBuffer = pollId.toArrayLike(Buffer, 'le', 8);
    const [pda] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
        pollIdBuffer,
        Buffer.from(candidateName),
        voterPubkey.toBuffer()
    ], __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PROGRAM_ID"]);
    return pda;
};
}}),
"[project]/target/idl/solana_voting_app.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"address\":\"C82ywxcsy6SahTq2CvdnGsN4xN1aKeWan7VR3mDQgi8V\",\"metadata\":{\"name\":\"solana_voting_app\",\"version\":\"0.1.0\",\"spec\":\"0.1.0\",\"description\":\"Created with Anchor\"},\"instructions\":[{\"name\":\"initialize_candidate\",\"discriminator\":[210,107,118,204,255,97,112,26],\"accounts\":[{\"name\":\"signer\",\"writable\":true,\"signer\":true},{\"name\":\"poll\",\"pda\":{\"seeds\":[{\"kind\":\"arg\",\"path\":\"poll_id\"}]}},{\"name\":\"candidate\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"arg\",\"path\":\"poll_id\"},{\"kind\":\"arg\",\"path\":\"candidate_name\"}]}},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"}],\"args\":[{\"name\":\"_poll_id\",\"type\":\"u64\"},{\"name\":\"candidate_name\",\"type\":\"string\"}]},{\"name\":\"initialize_poll\",\"discriminator\":[193,22,99,197,18,33,115,117],\"accounts\":[{\"name\":\"signer\",\"writable\":true,\"signer\":true},{\"name\":\"poll\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"arg\",\"path\":\"poll_id\"}]}},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"}],\"args\":[{\"name\":\"poll_id\",\"type\":\"u64\"},{\"name\":\"description\",\"type\":\"string\"},{\"name\":\"poll_start_time\",\"type\":\"u64\"},{\"name\":\"poll_end_time\",\"type\":\"u64\"}]},{\"name\":\"vote\",\"discriminator\":[227,110,155,23,136,126,172,25],\"accounts\":[{\"name\":\"signer\",\"writable\":true,\"signer\":true},{\"name\":\"poll\",\"pda\":{\"seeds\":[{\"kind\":\"arg\",\"path\":\"poll_id\"}]}},{\"name\":\"candidate\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"arg\",\"path\":\"poll_id\"},{\"kind\":\"arg\",\"path\":\"candidate_name\"}]}},{\"name\":\"voter_record\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"arg\",\"path\":\"poll_id\"},{\"kind\":\"arg\",\"path\":\"candidate_name\"},{\"kind\":\"account\",\"path\":\"signer\"}]}},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"}],\"args\":[{\"name\":\"_poll_id\",\"type\":\"u64\"},{\"name\":\"_candidate_name\",\"type\":\"string\"}]}],\"accounts\":[{\"name\":\"Candidate\",\"discriminator\":[86,69,250,96,193,10,222,123]},{\"name\":\"Poll\",\"discriminator\":[110,234,167,188,231,136,153,111]},{\"name\":\"VoterRecord\",\"discriminator\":[178,96,138,116,143,202,115,33]}],\"errors\":[{\"code\":6000,\"name\":\"PollNotStarted\",\"msg\":\"Poll has not started yet\"},{\"code\":6001,\"name\":\"PollEnded\",\"msg\":\"Poll has already ended\"}],\"types\":[{\"name\":\"Candidate\",\"type\":{\"kind\":\"struct\",\"fields\":[{\"name\":\"candidate_name\",\"type\":\"string\"},{\"name\":\"candidate_votes\",\"type\":\"u64\"}]}},{\"name\":\"Poll\",\"type\":{\"kind\":\"struct\",\"fields\":[{\"name\":\"poll_id\",\"type\":\"u64\"},{\"name\":\"description\",\"type\":\"string\"},{\"name\":\"poll_start_time\",\"type\":\"u64\"},{\"name\":\"poll_end_time\",\"type\":\"u64\"},{\"name\":\"candidate_amount\",\"type\":\"u64\"}]}},{\"name\":\"VoterRecord\",\"type\":{\"kind\":\"struct\",\"fields\":[]}}]}"));}}),
"[project]/app/hooks/useVotingProgram.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "useVotingProgram": (()=>useVotingProgram)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useAnchorWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useAnchorWallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useConnection.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@project-serum/anchor/dist/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@project-serum/anchor/dist/esm/program/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@project-serum/anchor/dist/esm/provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/node_modules/bn.js/lib/bn.js [app-ssr] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/web3.js/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$pdas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/pdas.ts [app-ssr] (ecmascript)");
// Import the IDL - adjust the path as needed
var __TURBOPACK__imported__module__$5b$project$5d2f$target$2f$idl$2f$solana_voting_app$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/target/idl/solana_voting_app.json (json)");
'use client';
;
;
;
;
;
;
;
// Function to adapt the IDL to the format Anchor expects
const adaptIdl = (rawIdl)=>{
    // Create a basic Idl structure that Anchor can work with
    const adaptedIdl = {
        version: rawIdl.metadata?.version || "0.1.0",
        name: rawIdl.metadata?.name || "solana_voting_app",
        instructions: rawIdl.instructions || [],
        accounts: [],
        types: []
    };
    // Process accounts
    if (rawIdl.accounts) {
        adaptedIdl.accounts = rawIdl.accounts.map((account)=>{
            return {
                name: account.name,
                type: {
                    kind: "struct",
                    fields: []
                }
            };
        });
    }
    // Process types if they exist
    if (rawIdl.types) {
        adaptedIdl.types = rawIdl.types.map((type)=>{
            // If the type already has a proper structure, use it
            if (type.type?.kind === "struct" && type.type?.fields) {
                return type;
            }
            // Otherwise create a minimal type definition
            return {
                name: type.name,
                type: {
                    kind: "struct",
                    fields: []
                }
            };
        });
    }
    // Add errors if they exist
    if (rawIdl.errors) {
        adaptedIdl.errors = rawIdl.errors;
    }
    return adaptedIdl;
};
const useVotingProgram = ()=>{
    const { connection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnection"])();
    const { publicKey, connected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWallet"])();
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useAnchorWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnchorWallet"])();
    const [program, setProgram] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [networkMismatch, setNetworkMismatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Network check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkNetwork = async ()=>{
            if (!wallet || !connected) {
                setStatus({
                    message: "Please connect your wallet",
                    isError: false
                });
                return;
            }
            try {
                console.log(`Expected network: ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NETWORK"]}, endpoint: ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ENDPOINT"]}`);
                try {
                    await connection.getLatestBlockhash();
                    console.log("Successfully connected to Solana network");
                    setNetworkMismatch(false);
                } catch (err) {
                    console.error("Network connection error:", err);
                    setNetworkMismatch(true);
                    setStatus({
                        message: `Connection to ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NETWORK"]} failed. Please check your wallet and network settings.`,
                        isError: true
                    });
                }
            } catch (err) {
                console.error("Network check error:", err);
            }
        };
        if (connected) {
            checkNetwork();
        }
    }, [
        connection,
        wallet,
        connected,
        publicKey
    ]);
    // Program initialization
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeProgram = async ()=>{
            if (!wallet || networkMismatch) {
                setProgram(null);
                return;
            }
            try {
                console.log("Initializing program with wallet:", wallet.publicKey.toString());
                console.log("Program ID:", __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PROGRAM_ID"].toString());
                // Create provider
                const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnchorProvider"](connection, wallet, {
                    commitment: 'confirmed',
                    preflightCommitment: 'confirmed',
                    skipPreflight: false
                });
                try {
                    // Adapt the IDL to the format Anchor expects
                    console.log("Adapting IDL to Anchor format");
                    const adaptedIdl = adaptIdl(__TURBOPACK__imported__module__$5b$project$5d2f$target$2f$idl$2f$solana_voting_app$2e$json__$28$json$29$__["default"]);
                    const programInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Program"](adaptedIdl, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PROGRAM_ID"], provider);
                    console.log("Program initialized successfully");
                    setProgram(programInstance);
                    setStatus({
                        message: "Connected to Solana program",
                        isError: false
                    });
                } catch (err) {
                    console.error("Error initializing program:", err);
                    throw new Error(`Program initialization failed: ${err}`);
                }
            } catch (err) {
                console.error('Failed to initialize program:', err);
                setStatus({
                    message: `Failed to initialize program: ${err}`,
                    isError: true
                });
            }
        };
        initializeProgram();
    }, [
        connection,
        wallet,
        networkMismatch
    ]);
    // Fetch all polls
    const fetchPolls = async ()=>{
        if (!program) return [];
        setLoading(true);
        setStatus(null);
        try {
            // Fetch all poll accounts
            const pollAccounts = await program.account.poll.all();
            console.log("Raw poll accounts:", pollAccounts);
            // Transform the data
            return pollAccounts.map((item)=>{
                const account = item.account;
                return {
                    publicKey: item.publicKey,
                    account: {
                        pollId: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](account.pollId?.toString() || account.poll_id?.toString() || '0'),
                        description: account.description || '',
                        pollStartTime: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](account.pollStartTime?.toString() || account.poll_start_time?.toString() || '0'),
                        pollEndTime: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](account.pollEndTime?.toString() || account.poll_end_time?.toString() || '0'),
                        candidateAmount: account.candidateAmount || account.candidate_amount || 0
                    }
                };
            });
        } catch (err) {
            console.error('Error fetching polls:', err);
            setStatus({
                message: `Failed to fetch polls: ${err}`,
                isError: true
            });
            return [];
        } finally{
            setLoading(false);
        }
    };
    // Fetch candidates for a specific poll
    const fetchCandidates = async (pollId)=>{
        if (!program) return [];
        setLoading(true);
        setStatus(null);
        try {
            // Fetch all candidates
            const allCandidates = await program.account.candidate.all();
            console.log("Raw candidate accounts:", allCandidates);
            // Transform the candidates
            return allCandidates.map((item)=>{
                const account = item.account;
                return {
                    publicKey: item.publicKey,
                    account: {
                        candidateName: account.candidateName || account.candidate_name || '',
                        candidateVotes: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](account.candidateVotes?.toString() || account.candidate_votes?.toString() || '0')
                    }
                };
            });
        } catch (err) {
            console.error('Error fetching candidates:', err);
            setStatus({
                message: `Failed to fetch candidates: ${err}`,
                isError: true
            });
            return [];
        } finally{
            setLoading(false);
        }
    };
    // Create a new poll
    const createPoll = async (description)=>{
        if (!program || !wallet) return false;
        setLoading(true);
        setStatus(null);
        try {
            // Generate a unique poll ID using current timestamp
            const pollId = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](Date.now());
            // Set poll duration - from now to 7 days in the future
            const now = Math.floor(Date.now() / 1000);
            const oneWeekFromNow = now + 7 * 24 * 60 * 60;
            // Get the PDA for the poll
            const pollPDA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$pdas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPollPDA"])(pollId);
            console.log("Creating poll with PDA:", pollPDA.toString());
            console.log("Parameters:", {
                pollId: pollId.toString(),
                description,
                startTime: now,
                endTime: oneWeekFromNow
            });
            // Log available methods to debug
            console.log("Available methods:", Object.keys(program.methods));
            // Try to find the correct method name
            const methodName = Object.keys(program.methods).find((name)=>name.toLowerCase() === 'initialize_poll' || name === 'initializePoll');
            if (!methodName) {
                throw new Error('initialize_poll method not found in program');
            }
            console.log("Using method name:", methodName);
            // Use the found method name
            const tx = await program.methods[methodName](pollId, description, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](now), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](oneWeekFromNow)).accounts({
                signer: wallet.publicKey,
                poll: pollPDA,
                system_program: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SystemProgram"].programId
            }).rpc({
                skipPreflight: true
            }).catch((err)=>{
                console.error("Detailed error:", err);
                if (err.logs) {
                    console.error("Transaction logs:", err.logs);
                }
                throw err;
            });
            console.log("Poll created! Transaction signature:", tx);
            setStatus({
                message: 'Poll created successfully!',
                isError: false
            });
            return true;
        } catch (err) {
            console.error('Error creating poll:', err);
            if (err.toString().includes('429')) {
                setStatus({
                    message: 'Network is busy. Please try again in a few moments.',
                    isError: true
                });
            } else {
                setStatus({
                    message: `Failed to create poll: ${err}`,
                    isError: true
                });
            }
            return false;
        } finally{
            setLoading(false);
        }
    };
    // Add a candidate to a poll
    const addCandidate = async (pollId, candidateName)=>{
        if (!program || !wallet) return false;
        setLoading(true);
        setStatus(null);
        try {
            // Get the PDAs
            const pollPDA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$pdas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPollPDA"])(pollId);
            const candidatePDA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$pdas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCandidatePDA"])(pollId, candidateName);
            console.log("Adding candidate to poll:", pollPDA.toString());
            console.log("Candidate PDA:", candidatePDA.toString());
            console.log("Parameters:", {
                pollId: pollId.toString(),
                candidateName
            });
            // Use snake_case method name
            const tx = await program.methods.initialize_candidate(pollId, candidateName).accounts({
                signer: wallet.publicKey,
                poll: pollPDA,
                candidate: candidatePDA,
                system_program: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SystemProgram"].programId
            }).rpc();
            console.log("Candidate added! Transaction signature:", tx);
            setStatus({
                message: 'Candidate added successfully!',
                isError: false
            });
            return true;
        } catch (err) {
            console.error('Error adding candidate:', err);
            if (err.toString().includes('429')) {
                setStatus({
                    message: 'Network is busy. Please try again in a few moments.',
                    isError: true
                });
            } else {
                setStatus({
                    message: `Failed to add candidate: ${err}`,
                    isError: true
                });
            }
            return false;
        } finally{
            setLoading(false);
        }
    };
    // Vote for a candidate
    const vote = async (pollId, candidateName)=>{
        if (!program || !wallet) return false;
        setLoading(true);
        setStatus(null);
        try {
            // Get the PDAs
            const pollPDA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$pdas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPollPDA"])(pollId);
            const candidatePDA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$pdas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCandidatePDA"])(pollId, candidateName);
            const voterRecordPDA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$pdas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVoterRecordPDA"])(pollId, candidateName, wallet.publicKey);
            console.log("Voting in poll:", pollPDA.toString());
            console.log("For candidate:", candidatePDA.toString());
            console.log("Voter record PDA:", voterRecordPDA.toString());
            console.log("Parameters:", {
                pollId: pollId.toString(),
                candidateName
            });
            // Call the vote instruction with snake_case field names
            const tx = await program.methods.vote(pollId, candidateName).accounts({
                signer: wallet.publicKey,
                poll: pollPDA,
                candidate: candidatePDA,
                voter_record: voterRecordPDA,
                system_program: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SystemProgram"].programId
            }).rpc();
            console.log("Vote recorded! Transaction signature:", tx);
            setStatus({
                message: 'Vote recorded successfully!',
                isError: false
            });
            return true;
        } catch (err) {
            console.error('Error voting:', err);
            if (err.toString().includes('429') || err.toString().toLowerCase().includes('rate limit')) {
                setStatus({
                    message: 'The network is busy. Please try again in a few seconds.',
                    isError: true
                });
            } else {
                setStatus({
                    message: `Failed to vote: ${err}`,
                    isError: true
                });
            }
            return false;
        } finally{
            setLoading(false);
        }
    };
    return {
        program,
        loading,
        status,
        fetchPolls,
        fetchCandidates,
        createPoll,
        addCandidate,
        vote,
        networkMismatch
    };
};
const __TURBOPACK__default__export__ = useVotingProgram;
}}),
"[project]/app/components/CreatePollForm.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useVotingProgram.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/constants.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const CreatePollForm = ({ onPollCreated })=>{
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { createPoll, loading, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!description.trim()) {
            return;
        }
        const success = await createPoll(description);
        if (success) {
            setDescription('');
            setTimeout(()=>{
                onPollCreated();
            }, 2000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800 p-4 rounded-lg mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-xl font-bold mb-4",
                children: "Create New Poll"
            }, void 0, false, {
                fileName: "[project]/app/components/CreatePollForm.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "description",
                                className: "block mb-2",
                                children: "Poll Description"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CreatePollForm.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                id: "description",
                                value: description,
                                onChange: (e)=>setDescription(e.target.value),
                                className: "w-full p-2 bg-slate-700 rounded border border-slate-600",
                                placeholder: "e.g., Which Solana project should we build next?",
                                maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_DESCRIPTION_LENGTH"],
                                rows: 3,
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/app/components/CreatePollForm.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-400 mt-1",
                                children: [
                                    description.length,
                                    "/",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_DESCRIPTION_LENGTH"]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CreatePollForm.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CreatePollForm.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading || !description.trim(),
                        className: "bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded disabled:opacity-50",
                        children: loading ? 'Creating...' : 'Create Poll'
                    }, void 0, false, {
                        fileName: "[project]/app/components/CreatePollForm.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CreatePollForm.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-4 p-3 rounded ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`,
                children: status.message
            }, void 0, false, {
                fileName: "[project]/app/components/CreatePollForm.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/CreatePollForm.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = CreatePollForm;
}}),
"[project]/app/components/AddCandidateForm.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useVotingProgram.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/constants.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AddCandidateForm = ({ pollId, onCandidateAdded })=>{
    const [candidateName, setCandidateName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { addCandidate, loading, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!candidateName.trim()) {
            return;
        }
        const success = await addCandidate(pollId, candidateName);
        if (success) {
            setCandidateName('');
            setTimeout(()=>{
                onCandidateAdded();
            }, 2000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-900 p-4 rounded-lg mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-lg font-bold mb-3",
                children: "Add Project Option"
            }, void 0, false, {
                fileName: "[project]/app/components/AddCandidateForm.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "candidateName",
                                className: "block mb-1 text-sm",
                                children: "Project Name"
                            }, void 0, false, {
                                fileName: "[project]/app/components/AddCandidateForm.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "candidateName",
                                type: "text",
                                value: candidateName,
                                onChange: (e)=>setCandidateName(e.target.value),
                                className: "w-full p-2 bg-slate-700 rounded border border-slate-600",
                                placeholder: "e.g., Solana DAO, Beer Token",
                                maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_CANDIDATE_NAME_LENGTH"],
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/app/components/AddCandidateForm.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-400 mt-1",
                                children: [
                                    candidateName.length,
                                    "/",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAX_CANDIDATE_NAME_LENGTH"]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AddCandidateForm.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AddCandidateForm.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading || !candidateName.trim(),
                        className: "bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-sm disabled:opacity-50",
                        children: loading ? 'Adding...' : 'Add Project'
                    }, void 0, false, {
                        fileName: "[project]/app/components/AddCandidateForm.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/AddCandidateForm.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-3 p-2 rounded text-sm ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`,
                children: status.message
            }, void 0, false, {
                fileName: "[project]/app/components/AddCandidateForm.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/AddCandidateForm.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = AddCandidateForm;
}}),
"[project]/app/components/CandidateList.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useVotingProgram.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const CandidateList = ({ pollId, candidates, isActive, onVoted })=>{
    const { vote, loading, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const [votingFor, setVotingFor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleVote = async (candidateName)=>{
        setVotingFor(candidateName);
        const success = await vote(pollId, candidateName);
        if (success) {
            setTimeout(()=>{
                onVoted();
                setVotingFor(null);
            }, 2000);
        } else {
            setVotingFor(null);
        }
    };
    if (candidates.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-slate-400 text-center py-4",
            children: "No project options added yet."
        }, void 0, false, {
            fileName: "[project]/app/components/CandidateList.tsx",
            lineNumber: 33,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2",
                children: candidates.map((candidate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "bg-slate-700 p-3 rounded-lg flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                        className: "font-medium",
                                        children: candidate.account.candidateName
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CandidateList.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-300",
                                        children: [
                                            "Votes: ",
                                            candidate.account.candidateVotes.toString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/CandidateList.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CandidateList.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleVote(candidate.account.candidateName),
                                disabled: loading || votingFor !== null,
                                className: "bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-sm disabled:opacity-50",
                                children: votingFor === candidate.account.candidateName ? 'Voting...' : 'Vote'
                            }, void 0, false, {
                                fileName: "[project]/app/components/CandidateList.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        ]
                    }, candidate.account.candidateName, true, {
                        fileName: "[project]/app/components/CandidateList.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/CandidateList.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            status && votingFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-3 p-2 rounded text-sm ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`,
                children: status.message
            }, void 0, false, {
                fileName: "[project]/app/components/CandidateList.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/CandidateList.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = CandidateList;
}}),
"[project]/app/components/PollCard.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddCandidateForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AddCandidateForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CandidateList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/CandidateList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useVotingProgram.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const PollCard = ({ poll, onRefresh })=>{
    const [candidates, setCandidates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showAddForm, setShowAddForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { fetchCandidates } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    // Check if poll is active
    const now = Math.floor(Date.now() / 1000);
    const isActive = poll.account.pollStartTime.lte(new BN(now)) && poll.account.pollEndTime.gte(new BN(now));
    // Load candidates for this poll
    const loadCandidates = async ()=>{
        setLoading(true);
        const pollCandidates = await fetchCandidates(poll.account.pollId);
        setCandidates(pollCandidates);
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadCandidates();
    }, [
        poll
    ]);
    const formatDate = (timestamp)=>{
        return new Date(timestamp.toNumber() * 1000).toLocaleString();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-800 p-4 rounded-lg ${isActive ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500 opacity-80'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-xl font-bold mb-2",
                children: poll.account.description
            }, void 0, false, {
                fileName: "[project]/app/components/PollCard.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-slate-400 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Status: ",
                            isActive ? 'Active' : 'Inactive'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PollCard.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Period: ",
                            formatDate(poll.account.pollStartTime),
                            " to ",
                            formatDate(poll.account.pollEndTime)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PollCard.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PollCard.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAddForm(!showAddForm),
                        className: "bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg text-sm",
                        children: showAddForm ? 'Cancel' : 'Add Project Option'
                    }, void 0, false, {
                        fileName: "[project]/app/components/PollCard.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    showAddForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddCandidateForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        pollId: poll.account.pollId,
                        onCandidateAdded: ()=>{
                            setShowAddForm(false);
                            loadCandidates();
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/PollCard.tsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PollCard.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-lg font-semibold mb-3",
                        children: "Project Options:"
                    }, void 0, false, {
                        fileName: "[project]/app/components/PollCard.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center py-4 text-slate-400",
                        children: "Loading candidates..."
                    }, void 0, false, {
                        fileName: "[project]/app/components/PollCard.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CandidateList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        pollId: poll.account.pollId,
                        candidates: candidates,
                        isActive: isActive,
                        onVoted: ()=>{
                            loadCandidates();
                            onRefresh();
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/PollCard.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PollCard.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/PollCard.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = PollCard;
}}),
"[project]/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletMultiButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useVotingProgram.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CreatePollForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/CreatePollForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PollCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PollCard.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function Home() {
    const { publicKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWallet"])();
    const { fetchPolls, loading, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useVotingProgram$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const [polls, setPolls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCreateForm, setShowCreateForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load polls when wallet connects
    const loadPolls = async ()=>{
        if (publicKey) {
            const fetchedPolls = await fetchPolls();
            setPolls(fetchedPolls);
        }
    };
    // Load polls on initial render and when wallet changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadPolls();
    }, [
        publicKey
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-screen flex-col py-8 bg-slate-900 text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-6 border-b border-slate-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold mb-4 md:mb-0 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text",
                            children: "Solana Dev Meetup Voting"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletMultiButton"], {}, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: publicKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold",
                                children: polls.length > 0 ? 'Active Polls' : 'No Polls Found'
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg",
                                onClick: ()=>setShowCreateForm(!showCreateForm),
                                children: showCreateForm ? 'Cancel' : 'Create New Poll'
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-800 py-12 rounded-lg flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold mb-4",
                                children: "Welcome to Solana Dev Meetup Voting"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-slate-400 mb-6 max-w-md",
                                children: "Connect your wallet to create polls and vote on project ideas for your next Solana dev meetup"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletMultiButton"], {}, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `p-4 rounded-lg mb-6 ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`,
                    children: status.message
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this),
                showCreateForm && publicKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CreatePollForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onPollCreated: ()=>{
                            setShowCreateForm(false);
                            loadPolls();
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 75,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this),
                publicKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: loading && polls.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-full text-center py-8 text-slate-400",
                        children: "Loading polls..."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 86,
                        columnNumber: 15
                    }, this) : polls.length > 0 ? polls.map((poll)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PollCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            poll: poll,
                            onRefresh: loadPolls
                        }, poll.publicKey.toString(), false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 91,
                            columnNumber: 17
                        }, this)) : !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-full text-center py-8 text-slate-400",
                        children: "No polls found. Create one to get started!"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 98,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 84,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__b0424241._.js.map