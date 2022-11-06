console.clear();
import { Session } from "./modules/internal/handlers/session_manager.js";
import { UI } from "./modules/internal/handlers/ui.js";
const main = await new Session().init();
new UI(main, {
    start_point: "$start",
    command_groups: ["main", "ssh"]
}).run();
