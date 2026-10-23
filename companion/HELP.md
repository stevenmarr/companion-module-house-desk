# House desk

Point **Control Center URL** at the desk, for example `http://127.0.0.1:8080`.

Preset buttons are the slot number on the first line and the name on the second. Program lights red. Preview lights green.

**ATEM encoder step** changes DVE size and position, SuperSource box size and position, and luma clip and gain. The USK or box number is 1–4. Coarse uses the larger step. The desk opens the matching encoder bank when a command lands.

Variables `$(this:dve_k1_size)`, `$(this:luma_k1_clip)`, and `$(this:ss_b1_size)` follow the live values. The same pattern runs through keyer and box 4.
