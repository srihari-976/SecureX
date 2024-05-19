// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrimeRecords {
    struct Crime {
        string criminalName;
        string location;
        string crime;
    }

    Crime[] public crimes;

    function addCrime(string memory _criminalName, string memory _location, string memory _crime) public {
        crimes.push(Crime(_criminalName, _location, _crime));
    }

    function getCrime(uint _index) public view returns (string memory, string memory, string memory) {
        require(_index < crimes.length, "Index out of bounds");
        Crime memory crime = crimes[_index];
        return (crime.criminalName, crime.location, crime.crime);
    }

    function getCrimesCount() public view returns (uint) {
        return crimes.length;
    }
}
