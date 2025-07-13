#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

class Solution {
    struct disjntuni {
        vector<int> p, r;
        disjntuni(int n): p(n), r(n) { iota(p.begin(), p.end(), 0); }
        int fnd(int x) { return p[x]==x ? x : p[x]=fnd(p[x]); }
        bool join(int curr_a, int curr_b) {
            curr_a = fnd(curr_a);
            curr_b = fnd(curr_b);
            if (curr_a == curr_b) return false;
            if (r[curr_a] < r[curr_b]) swap(curr_a, curr_b);
            p[curr_b] = curr_a;
            if (r[curr_a] == r[curr_b]) r[curr_a]++;
            return true;
        }
    };
public:
    int minimizeMax(int n, vector<vector<int>>& edges, int k) {
        sort(edges.begin(), edges.end(), [](auto &a, auto &b){ return a[2] < b[2]; });
        disjntuni disjntuni(n);
        int cnt = n;
        if (cnt <= k) return 0;
        for (auto &e : edges) {
            if (disjntuni.join(e[0], e[1])) {
                cnt--;
                if (cnt == k) return e[2];
            }
        }
        return 0;
    }
};
