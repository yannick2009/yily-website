{
  description = "Yily website development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        # Development packages
        devPkgs = with pkgs; [
          just
          nodejs
          nixfmt
        ];

      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = devPkgs;
          shellHook = ''
            echo "Welcome to the development shell!"
            (npm install --silent || true) && echo "Node.js dependencies installed. ✅"
          '';
        };
        packages = {
          default = { };
        };
      }
    );
}
