---
title: Smoothed Particle Hydrodynamics
---

Smoothed Particle
Hydrodynamics, is a Lagrangian scheme based on particle interpolation to calculate
field quantities. A particle carries all physical quantities of the system to be simulated,
such as mass, density, velocity, internal energy etc. The foundation of the SPH
formulation is the Dirac sifting Property

$$
f(\mathbf{x}) = \int_\Omega f(\mathbf{x}') \, \delta(\mathbf{x} - \mathbf{x}') \, \mathrm{d}^n \mathbf{x}',
$$

where $f(\mathbf{x})$ is a smooth function in the domain $\Omega \subseteq \mathbb{R}^n$ and calculated at $\mathbf{x} \in \Omega$. 
$\delta(\mathbf{x})$ is the Dirac delta distribution and $n = 1,2,3$ denotes the spatial dimension. 

### Kernel Approximation

If we now substitute the Dirac delta distribution by an interpolation function we obtain the kernel approximation

$$
\left< f(\mathbf{x}) \right> = \int_\Omega f(\mathbf{x}^\prime) W(\|\mathbf{x} - \mathbf{x}^\prime \|,h)d^n\mathbf{x}^\prime,
$$

where $\left< f(\mathbf{x}) \right >$ is the approximation of the smoothed function, $W$ is the interpolation kernel function, and $h$ the smoothing length. 
In most cases $W$ is a bell-shaped function that must satisfy the following normalization condition

$$
M_0 = \int_\Omega W(\| \mathbf{x} - \mathbf{x}^\prime \|,h) d^n\mathbf{x}^\prime =1.
$$

Furthermore it must approach the Dirac delta distribution when the smoothing length approaches zero $h \to 0$. It also must be positive definite, be even so that

$$
W(\| \mathbf{x} - \mathbf{x}^\prime \|,h)  = W(\|\mathbf{x}^\prime - \mathbf{x} \|,h) ,
$$

and it must be monotonically decreasing meaning it has to vanish outside a finite radius of $kh$. By expanding the function $f(\mathbf{x})$ in a Taylor series around the point $\mathbf{x}$, the kernel approximation can be expressed as a series involving the moments of the kernel

$$
M_\ell = \int_\Omega (\mathbf{x}^\prime - \mathbf{x})^\ell W(\| \mathbf{x} - \mathbf{x}^\prime \|,h) d^n \mathbf{x}^\prime = \mathbf{0}^\ell,
$$

where $0^\ell$ is the null tensor of rank $\ell$. 

The approximation converges to the exact function value only if a hierarchy of kernel consistency conditions is satisfied. Zeroth-order consistency $(C^0)$ is ensured by the normalization of the kernel, while first-order consistency $(C^1)$ is automatically fulfilled due to kernel symmetry. All odd-order moments vanish for the same reason. However, even-order moments do not generally vanish. In particular, the second-order moment leads to a second-order error in the function approximation. As a result, standard SPH kernels do not achieve second-order $(C^2)$ consistency unless higher-order kernels are employed.

A similar expression can be obtained for the estimate of the gradient and its moments

$$
\left< \nabla f(\mathbf{x}) \right> = \int_\Omega \nabla W(\| \mathbf{x} - \mathbf{x}^\prime \|,h) d^n\mathbf{x}^\prime,
$$

$$
M^\prime_\ell = \int_\Omega (\mathbf{x}^\prime - \mathbf{x})^\ell \otimes \nabla W(\| \mathbf{x} - \mathbf{x}^\prime \|,h) d^n\mathbf{x}^\prime = \mathbf{0}^{\ell+1}
$$

### Particle Approximation

In SPH, the fluid is represented by a set of Lagrangian particles that move with the flow. As a result, their spatial distribution can become irregular over time. The computational domain $\Omega$ is divided into N Lagrangian subdomains $\Omega_k$, each containing one particle located at $\mathbf{x}_k \in \Omega_k$.
The boundaries of these subdomains are typically defined such that the mass of each subdomain remains constant during the simulation. For a given observation point $\mathbf{x}_a$, the kernel support $\Omega_s$ defines the region over which interactions are considered. This region corresponds to a circle in two dimensions or a sphere in three dimensions and is centered at $\mathbf{x}_a$.
Numerical integration is therefore carried out over the intersection of the kernel support $\Omega_s$ with the finite computational domain $\Omega$. The subdomains contained in this intersection define the neighboring particles of particle $a$.

By applying the mean value theorem and choosing a representative point $\mathbf{x}_b \in \Omega_b$ for each neighboring subdomain $\Omega_b$, and denoting its volume by $V_b$, the continuous integral expression can be written in discretized form as

$$
\left < f_a\right >= f_a = \sum_{b = 1}^{n} \int_{\Omega-b} f(\mathbf{x}^\prime) W(\| \mathbf{x}_a - \mathbf{x}^\prime \|,h) d^n\mathbf{x}^\prime,
$$

which using the so called summation interpolant yields
$$
f_a \approx \sum_{b = 1}^{n} f(\mathbf{x}_b) W(\| \mathbf{x}_a - \mathbf{x}_b \|,h) V_b.
$$

In order to simplify notation we will write $W_{ab} = W(\| \mathbf{x}_a - \mathbf{x}_b \|,h)$, and $\mathcal{N}_a = \{1,2,...,n_a\}$ being the set of all neighbors of particle $a$:

$$
f_a = \sum_{b \in \mathcal{N}_a} f_b W_{ab} V_b,
$$

the volume can be replaced by the ratio of mass and density $V_b = \frac{m_b}{\rho_b}$. Following the same scheme, the particle approximation for the gradient can be written as

$$
\left(\nabla f\right)_a = \sum_{b \in \mathcal{N}_a} f_b \nabla_a W_{ab} V_b.
$$
